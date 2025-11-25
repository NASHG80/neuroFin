import json

from agent.agents.analyst_agent import analyst_agent
from agent.agents.forecast_agent import forecaster_agent
from agent.agents.classifier_agent import classifier_agent
from agent.agents.risk_agent import risk_agent
from agent.agents.user_goal_agent import get_user_goal_summary
from agent.agents.llm import call_llm


def advisor_agent(user_id: str, user_message: str) -> dict:
    """
    NeuroFin Senior Financial Advisor Agent
    Combines:
    - Analyst insights
    - Forecast (trend, cashflow, runout)
    - Risk evaluation
    - User goal understanding
    - Spending classification patterns
    """

    # ---- STEP 1: Retrieve all agent outputs ----
    analyst = analyst_agent(user_id)
    forecast = forecaster_agent(user_id)
    risk_eval = risk_agent(user_id)   # FIXED
    goal = get_user_goal_summary(user_id)
    classified_stats = classifier_agent(user_id)

    # ---- STEP 2: Build reasoning prompt for LLM ----
    prompt = f"""
You are NeuroFin’s Senior Financial Advisor AI.

User message:
"{user_message}"

User financial patterns:
{json.dumps(analyst, indent=2)}

30-day Forecast:
{json.dumps(forecast, indent=2)}

Risk Assessment:
{json.dumps(risk_eval, indent=2)}

User Goal:
{json.dumps(goal, indent=2)}

Spending category stats:
{json.dumps(classified_stats, indent=2)}

Now produce a final advisory message for the user with the structure:

1. **Summary Insight** (1–2 lines)
2. **Your Financial Health** (risk-aware explanation)
3. **Goal Progress & Feasibility**
4. **Personalized Plan (3 actionable steps)** 
5. **If danger: Immediate warning in one short sentence**

Tone: Empathetic, professional, concise.
"""

    # ---- STEP 3: LLM Final Advisory ----
    answer = call_llm(prompt)

    return {
        "advisor_response": answer,
        "analyst": analyst,
        "forecast": forecast,
        "risk": risk_eval,
        "goal": goal,
        "classifier_stats": classified_stats
    }
