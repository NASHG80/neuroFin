import re
from agents.planner_agent import planner_agent
from api.src.memory import (
    get_user_profile,
    update_user_profile,
    get_goals,
    add_goal,
    get_spending_pattern
)
from agents.analyst_agent import analyst_agent
from agents.forecast_agent import forecast_agent
from agents.advisor_agent import advisor_agent
from agents.risk_agent import risk_agent
from agents.classifier_agent import classifier_agent
from agents.llm import call_llm


def detect_intent(user_message: str):
    """
    LLM intent detection (fast + cheap).
    """
    prompt = f"""
Classify the user message into ONE label:
ANALYZE_SPENDING, FORECAST, ADD_GOAL, GET_GOALS, PROFILE_UPDATE,
ADVICE, RISK_CHECK, CLASSIFY, UNKNOWN

Message: "{user_message}"

Respond ONLY with label.
"""

    label = call_llm(prompt).strip().upper()
    if label not in {
        "ANALYZE_SPENDING", "FORECAST", "ADD_GOAL", "GET_GOALS",
        "PROFILE_UPDATE", "ADVICE", "RISK_CHECK", "CLASSIFY", "UNKNOWN"
    }:
        label = "UNKNOWN"

    return label


def extract_goal(user_message: str):
    """
    Parse simple goal patterns:
    - I want to buy a phone in 3 months
    - Need 20,000 for emergency
    """
    amount = None
    title = None
    deadline = None

    amt_match = re.search(r"(\d{3,7})", user_message)
    if amt_match:
        amount = int(amt_match.group(1))

    # Simple title extraction
    if "buy" in user_message.lower():
        title = user_message[user_message.lower().index("buy") + 4 :]

    # Simple deadline detection
    if "month" in user_message.lower():
        deadline = user_message

    return title, amount, deadline


def detect_profile_update(message: str):
    """
    Detect profile facts:
    - My salary is 60k
    - My rent is 12,000
    """
    if "salary" in message.lower():
        match = re.search(r"(\d{4,7})", message)
        if match:
            return ("salary", int(match.group(1)))

    if "rent" in message.lower():
        match = re.search(r"(\d{4,7})", message)
        if match:
            return ("rent", int(match.group(1)))

    return None, None


def router_agent(user_id: str, message: str):
    """
    Master Agent — connects planner + memory + sub-agents.
    """

    # 0) Detect intent
    intent = detect_intent(message)

    # 1) Read memory
    profile = get_user_profile(user_id)
    goals = get_goals(user_id)
    pattern = get_spending_pattern(user_id)

    results = {}

    # 2) Handle special memory-based actions
    if intent == "ADD_GOAL":
        title, amount, deadline = extract_goal(message)
        goal = add_goal(user_id, title, amount, deadline)
        return {
            "intent": "ADD_GOAL",
            "goal_saved": goal,
            "answer": f"Goal saved: {title} ({amount})"
        }

    if intent == "GET_GOALS":
        return {
            "intent": "GET_GOALS",
            "goals": goals,
            "answer": f"You have {len(goals)} active goals."
        }

    if intent == "PROFILE_UPDATE":
        key, value = detect_profile_update(message)
        if key:
            update_user_profile(user_id, key, value)
            return {
                "intent": "PROFILE_UPDATE",
                "updated_field": key,
                "value": value,
                "answer": f"Updated your {key} to {value}"
            }

    # 3) Use planner to get which agents must run
    plan = planner_agent(message)

    # 4) Execute agent steps
    for step in plan["steps"]:
        agent_name = step["agent"]

        if agent_name == "analyst":
            results["analyst"] = analyst_agent(user_id)

        elif agent_name == "forecaster":
            results["forecaster"] = forecast_agent(user_id)

        elif agent_name == "risk_checker":
            results["risk"] = risk_agent(user_id)

        elif agent_name == "advisor":
            results["advisor"] = advisor_agent(user_id, profile, goals, pattern)

        elif agent_name == "classifier":
            # User wants "what category is X"
            desc_match = re.search(r"category of (.*)", message.lower())
            if desc_match:
                results["classifier"] = classifier_agent(desc_match.group(1))

    # 5) LLM final answer stitching
    summary_prompt = f"""
You are NeuroFin Smart Advisor.

User message: {message}

Profile: {profile}
Goals: {goals}
Patterns: {pattern}

Sub-agent outputs:
{results}

Give a single concise, helpful, personalized answer.
"""

    final_answer = call_llm(summary_prompt)

    return {
        "intent": intent,
        "results": results,
        "answer": final_answer
    }
