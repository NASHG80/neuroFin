import requests
import numpy as np

API_BASE = "http://api:4000"

def analyst_agent(user_id: str) -> dict:
    """
    Analyzes spending patterns using user's transaction history.
    Returns summary, category breakdown, trends, and insights.
    """

    # Fetch last 200 transactions
    try:
        r = requests.get(f"{API_BASE}/api/v1/transactions/{user_id}?limit=200", timeout=10)
        txs = r.json() if r.status_code == 200 else []
    except Exception:
        txs = []

    if not isinstance(txs, list) or len(txs) == 0:
        return {
            "summary": "No transaction data found for the user.",
            "categories": {},
            "top_spends": [],
            "daily_avg": 0,
            "insights": []
        }

    # ---- Category totals ----
    category_totals = {}
    for t in txs:
        cat = t.get("category", "Other")
        amt = t.get("amount", 0)
        direction = t.get("direction", "debit")

        if direction == "credit":
            amt = -amt  # credits reduce spending

        category_totals[cat] = category_totals.get(cat, 0) + amt

    # ---- Top spending categories ----
    sorted_cats = sorted(category_totals.items(), key=lambda x: x[1], reverse=True)
    top_spends = sorted_cats[:3]

    # ---- Daily spending trend ----
    # gather amounts grouped by date
    daily_map = {}
    for t in txs:
        ts = (t.get("timestamp") or t.get("created_at") or "")[:10]  # YYYY-MM-DD
        amt = t.get("amount", 0)
        direction = t.get("direction", "debit")
        if direction == "credit":
            amt = -amt

        daily_map[ts] = daily_map.get(ts, 0) + amt

    daily_values = list(daily_map.values())
    daily_avg = np.mean(daily_values) if daily_values else 0

    # ---- Insights ----
    insights = []

    if top_spends:
        insights.append(f"Your highest spending category is **{top_spends[0][0]}**.")

    if daily_avg > 1500:
        insights.append("Your average daily spending is higher than usual — consider reducing discretionary purchases.")
    elif daily_avg < 500:
        insights.append("Your daily spending is stable and low — good control over expenses.")

    if "Food & Drink" in category_totals and category_totals["Food & Drink"] > 0.25 * sum(category_totals.values()):
        insights.append("A significant portion of spending is on Food & Drink — consider cooking more at home.")

    return {
        "summary": f"Analyzed {len(txs)} transactions.",
        "categories": category_totals,
        "top_spends": [{"category": c, "total": t} for c, t in top_spends],
        "daily_avg": round(float(daily_avg), 2),
        "insights": insights
    }
