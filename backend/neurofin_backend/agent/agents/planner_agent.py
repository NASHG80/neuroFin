import re

def planner_agent(user_query: str):
    q = user_query.lower()
    plan = {"steps": []}

    # ----------------------------------------------------
    # 1) SAVINGS ANALYSIS
    # ----------------------------------------------------
    if any(w in q for w in [
        "savings", "saving rate", "save more",
        "improve savings", "increase savings",
        "optimize savings"
    ]):
        plan["steps"].append({"agent": "savings_analyzer"})
        plan["steps"].append({"agent": "advisor"})
        return plan

    # ----------------------------------------------------
    # 2) INVESTMENT ADVICE
    # ----------------------------------------------------
    if any(w in q for w in [
        "invest", "investment", "portfolio",
        "returns", "investment plan", "sip", "mutual fund"
    ]):
        plan["steps"].append({"agent": "investment_agent"})
        plan["steps"].append({"agent": "advisor"})
        return plan

    # ----------------------------------------------------
    # 3) AUTOMATION RULES
    # ----------------------------------------------------
    if any(w in q for w in [
        "automation", "automate", "auto-pay",
        "rules", "setup automation", "auto debit"
    ]):
        plan["steps"].append({"agent": "automation_agent"})
        plan["steps"].append({"agent": "advisor"})
        return plan

    # ----------------------------------------------------
    # 4) FORECASTING (FORECAST MUST NOT USE ADVISOR)
    # ----------------------------------------------------
    if any(w in q for w in [
        "forecast", "predict", "projection", "estimate",
        "future", "next month", "next week", "spending next month",
        "expected spending", "cashflow", "expense forecast",
        "spending forecast", "forecast my spendings",
        "forecast next year", "future expenses", "prediction"
    ]):
        plan["steps"].append({"agent": "forecaster"})
        return plan   # IMPORTANT → Do NOT call advisor after forecast

    # ----------------------------------------------------
    # 5) RISK CHECK
    # ----------------------------------------------------
    if any(w in q for w in [
        "risk", "danger", "critical", "alert",
        "overspending", "risk analysis", "risk check"
    ]):
        plan["steps"].append({"agent": "risk_checker"})
        plan["steps"].append({"agent": "advisor"})
        return plan

    # ----------------------------------------------------
    # 6) SPENDING ANALYSIS
    # ----------------------------------------------------
    if any(w in q for w in [
        "spend ", "spent", "analysis",
        "where did my money go", "expense breakdown"
    ]):
        plan["steps"].append({"agent": "analyst"})
        plan["steps"].append({"agent": "advisor"})
        return plan

    # ----------------------------------------------------
    # 7) FALLBACK (DEFAULT WEEKLY SUMMARY)
    # ----------------------------------------------------
    plan["steps"].append({"agent": "analyst"})
    plan["steps"].append({"agent": "advisor"})
    return plan
