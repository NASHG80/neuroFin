from agent.agents.analyst_agent import analyst_agent
from agent.agents.forecast_agent import forecast_agent
from agent.agents.classifier_agent import classifier_agent
from agent.agents.risk_agent import risk_agent
from agent.agents.llm import call_llm
from agent.agents.savings_analyzer_agent import savings_analyzer_agent
from agent.agents.automation_agent import automation_agent
from agent.agents.investment_agent import investment_agent

from pymongo import MongoClient
import os


# ----------------------------------------------------
# CLEANING FUNCTION (VERY IMPORTANT)
# ----------------------------------------------------
def clean(text: str):
    """
    Ensures the LLM response is always clean:
    - No markdown (#, *, -, etc.)
    - Replace $ → ₹
    - Remove extra spacing
    - Ensure plain text only
    """
    if text is None:
        return "No response"

    t = str(text)

    replace_map = {
        "*": "",
        "#": "",
        "- ": "",
        " -": "",
        "$": "₹",
    }
    for a, b in replace_map.items():
        t = t.replace(a, b)

    while "\n\n" in t:
        t = t.replace("\n\n", "\n")

    return t.strip()


# ----------------------------------------------------
# MONGO CONNECTION
# ----------------------------------------------------
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB = MongoClient(MONGO_URI)["neurofin"]
SANDBOX = DB["sandboxmonthlytransactions"]


# ----------------------------------------------------
# INTENT DETECTION
# ----------------------------------------------------
def detect_intent(message):
# ----------------------------------------------------
# INTENT DETECTION
# ----------------------------------------------------
def detect_intent(message):
    q = message.lower()

    if any(w in q for w in ["forecast", "next month", "projection", "future"]):
    if any(w in q for w in ["forecast", "next month", "projection", "future"]):
        return "FORECAST"

    if any(w in q for w in ["saving", "savings", "save more", "savings rate"]):
        return "ANALYZE_SAVINGS"

    if any(w in q for w in ["invest", "portfolio", "mutual fund", "stock"]):
    if any(w in q for w in ["invest", "portfolio", "mutual fund", "stock"]):
        return "INVESTMENT_ADVICE"

    if "risk" in q:
        return "RISK_CHECK"

    if any(w in q for w in ["spending", "analysis", "expenses"]):
        return "ANALYZE_SPENDING"

    if "automation" in q:
        return "AUTOMATION"

    return "WEEKLY_SUMMARY"



# ----------------------------------------------------
# ROUTER AGENT (FINAL)
# ----------------------------------------------------
def router_agent(user_id, message):

    intent = detect_intent(message)

    # ======================================================
    # FORECAST
    # ======================================================
    if intent == "FORECAST":
        data = forecast_agent()

        prompt = f"""
Respond in clean plain text.
No markdown. No hashtags. No stars. No hyphens.
Use ₹ for currency.

Format:

30 Day Forecast
• Trend: <trend>
• Projected Spending: ₹<next_month>

Risks
1. <risk1>
2. <risk2>

Recommendation
• <advice>

Here is the forecast data:
{data}
"""

        return {"answer": clean(call_llm(prompt))}

    # ======================================================
    # SPENDING ANALYSIS
    # ======================================================
    if intent == "ANALYZE_SPENDING":
        data = analyst_agent()

        data = analyst_agent()

        prompt = f"""
Produce a clean text summary.

Format:

Spending Insights
• <insight1>
• <insight2>
• <insight3>
• <insight4>

Improvements
1. <tip1>
2. <tip2>
3. <tip3>

Spending Risk Score
• <score>

Data:
{data}
"""

        return {"answer": clean(call_llm(prompt))}

    # ======================================================
    # SAVINGS ANALYSIS
    # ======================================================
    if intent == "ANALYZE_SAVINGS":
        data = savings_analyzer_agent()

        data = savings_analyzer_agent()

        prompt = f"""
Return a human-friendly financial summary.
No markdown. No hashtags. No stars. No hyphens.

Format:

Savings Health
• Score: <score>/100
• Net Savings: ₹<net_savings>
• Savings Rate: <rate>%

Ideal Savings
• Suggested Target: ₹<ideal>
• Gap From Target: ₹<gap>

Top Issues
1. <category1>: ₹<amount1>
2. <category2>: ₹<amount2>
3. <category3>: ₹<amount3>

Improvement Plan
• <tip1>
• <tip2>
• <tip3>

Here is the savings data:
{data}
"""

        return {"answer": clean(call_llm(prompt))}

    # ======================================================
    # INVESTMENT ADVICE
    # ======================================================
    if intent == "INVESTMENT_ADVICE":
        data = investment_agent(SANDBOX)

        data = investment_agent(SANDBOX)

        prompt = f"""
Generate simple investment advice.
Clean text only.

Format:

Investment Overview
• Total Value: ₹<value>
• Risk Level: <risk>

Ideal Allocation
1. <alloc1>
2. <alloc2>
3. <alloc3>

Safe Options
• <safe1>
• <safe2>
• <safe3>

Growth Options
• <growth1>
• <growth2>
• <growth3>

Recommendation
• <advice>

Here is the portfolio data:
{data}
"""

        return {"answer": clean(call_llm(prompt))}

    # ======================================================
    # RISK CHECK
    # ======================================================
    if intent == "RISK_CHECK":
        data = risk_agent()

        prompt = f"""
Give a clean financial risk summary.

Format:

Risk Level
• <level>

Major Risks
1. <risk1>
2. <risk2>
3. <risk3>

Stability Probability
• <percent>

Fixes
• <fix1>
• <fix2>
• <fix3>

Here is the user's data:
{data}
"""

        return {"answer": clean(call_llm(prompt))}

    # ======================================================
    # AUTOMATION RECOMMENDATIONS
    # ======================================================
    if intent == "AUTOMATION":
        data = automation_agent()

        prompt = f"""
Return a simple text summary of automation suggestions.

Format:

Smart Automations
• <rule1>
• <rule2>
• <rule3>

Best Automation
• <best_rule>

Data:
{data}
"""

        return {"answer": clean(call_llm(prompt))}

    # ======================================================
    # WEEKLY SUMMARY (DEFAULT)
    # ======================================================
    analyst_data = analyst_agent()
    risk_data = risk_agent()
    forecast_data = forecast_agent()

    prompt = f"""
Create a short weekly summary.
Plain text only.

Format:

Weekly Insights
• <insight1>
• <insight2>
• <insight3>

Financial Score
• <score>/100

Fixes For Next Week
1. <fix1>
2. <fix2>
3. <fix3>

Here is the data:
Spending: {analyst_data}
Risk: {risk_data}
Forecast: {forecast_data}
"""

    return {"answer": clean(call_llm(prompt))}
