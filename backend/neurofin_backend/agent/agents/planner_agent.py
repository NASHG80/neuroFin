import json

def planner_agent(user_query: str) -> dict:
    """
    High-level agent that decides which sub-agents/tools should run.
    Output is a structured plan the controller will execute.
    """

    q = user_query.lower()

    plan = {"steps": []}

    # --- Spending Analysis ---
    if any(word in q for word in ["spend", "spent", "where did my money go", "analysis"]):
        plan["steps"].append({
            "agent": "analyst",
            "input": "Analyze the user's transactions and give insights."
        })

    # --- Forecasting ---
    if any(word in q for word in ["future", "forecast", "next month", "cashflow"]):
        plan["steps"].append({
            "agent": "forecaster",
            "input": "Provide the user's financial forecast summary."
        })

    # --- Risk Check ---
    if any(word in q for word in ["risk", "danger", "critical", "alert"]):
        plan["steps"].append({
            "agent": "risk_checker",
            "input": "Perform risk evaluation on the user's financial pattern."
        })

    # --- If nothing matches, do general advice ---
    if not plan["steps"]:
        plan["steps"].append({
            "agent": "advisor",
            "input": "General personalized financial guidance."
        })

    return plan
