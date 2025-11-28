from datetime import datetime, timedelta
import numpy as np
from pymongo import MongoClient
import os
from collections import defaultdict

from api.src.memory import fix_mongo_ids

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB = MongoClient(MONGO_URI)["neurofin"]
transactions = DB["transactions"]


def safe_polyfit(x, y):
    """Safe regression to avoid SVD failures."""
    try:
        return np.polyfit(x, y, 1)
    except:
        slope = (y[-1] - y[0]) / max(len(y), 1)
        intercept = y[0]
        return slope, intercept


def forecast_agent(user_id: str):
    txs = list(transactions.find({"user_id": user_id}))

    if len(txs) < 5:
        return {
            "summary": "Not enough data for forecast",
            "trend": "unknown",
            "warnings": ["Insufficient historical data"],
        }

    # --------------------------
    # DAILY SPENDING AGGREGATION
    # --------------------------
    daily = defaultdict(float)
    categories = defaultdict(float)
    merchants = defaultdict(float)
    subscriptions = defaultdict(float)

    for t in txs:
        amt = float(t.get("amount", 0))
        if t.get("direction") == "credit":
            amt = -abs(amt)
        cat = t.get("category", "Other")
        merchant = t.get("merchant", "Unknown")

        date_str = str(t.get("timestamp", ""))[:10]
        try:
            datetime.fromisoformat(date_str)
        except:
            continue

        daily[date_str] += amt
        categories[cat] += amt
        merchants[merchant] += amt

        if "subscription" in cat.lower() or "renewal" in cat.lower():
            subscriptions[merchant] += amt

    # sort by date
    dates = sorted(daily.keys())
    y = np.array([daily[d] for d in dates], dtype=float)
    x = np.arange(len(y))

    # --------------------------
    # REGRESSION
    # --------------------------
    slope, intercept = safe_polyfit(x, y)
    trend = "UPWARD" if slope > 0 else ("DOWNWARD" if slope < 0 else "STABLE")

    # --------------------------
    # SHORT TERM (7 DAYS)
    # --------------------------
    weekly_forecast = []
    last = y[-1]

    for i in range(1, 8):
        weekly_forecast.append({
            "day": i,
            "expected_spending": round(last + slope * i, 2)
        })

    # --------------------------
    # NEXT MONTH PROJECTION
    # --------------------------
    next_month_total = float(sum(last + slope * i for i in range(1, 31)))

    # --------------------------
    # CATEGORY-WISE FORECAST
    # --------------------------
    category_projection = {
        cat: round(val * 1.1, 2)   # assume 10% lifestyle creep
        for cat, val in categories.items()
    }

    # --------------------------
    # 3 MONTH PROJECTION
    # --------------------------
    three_month = next_month_total * 3

    # --------------------------
    # 1 YEAR, 5 YEAR, 10 YEAR
    # --------------------------
    one_year = next_month_total * 12
    five_year = one_year * 5
    ten_year = one_year * 10

    # --------------------------
    # RUNWAY
    # --------------------------
    total_balance = -sum(y)
    daily_burn = slope if slope < 0 else -abs(slope)

    runway_days = int(total_balance / abs(daily_burn)) if daily_burn < -10 else None

    # --------------------------
    
    # --------------------------
    weekend_spend = 0
    weekday_spend = 0
    weekend_days = 0
    weekday_days = 0

    for d, amt in daily.items():
        day = datetime.fromisoformat(d).weekday()
        if day >= 5:  # Sat, Sun
            weekend_spend += amt
            weekend_days += 1
        else:
            weekday_spend += amt
            weekday_days += 1

    avg_weekend = weekend_spend / weekend_days if weekend_days else 0
    avg_weekday = weekday_spend / weekday_days if weekday_days else 0

    habit_trends = {
        "weekend_spike": avg_weekend > avg_weekday * 1.3,
        "late_month_spike": y[-10:].mean() > y[:10].mean() * 1.25
    }

    # --------------------------
    # SUBSCRIPTION FORECAST
    # --------------------------
    subscription_projection = {
        s: round(val * 12, 2) for s, val in subscriptions.items()
    }

    # --------------------------
    # RISK SCORE
    # --------------------------
    risk_score = min(
        100,
        max(0, int((abs(slope) / (abs(np.mean(y)) + 1))) * 120)
    )

    # --------------------------
    # WARNINGS
    # --------------------------
    warnings = []
    if risk_score > 70:
        warnings.append("High upcoming overspending risk")
    if runway_days and runway_days < 20:
        warnings.append("You may run out of money soon")
    if habit_trends["late_month_spike"]:
        warnings.append("Late-month overspending pattern detected")

    # --------------------------
    # FINAL RETURN
    # --------------------------
    return fix_mongo_ids({
        "trend": trend,
        "weekly_forecast": weekly_forecast,
        "next_month_total": round(next_month_total, 2),
        "three_month_projection": round(three_month, 2),
        "year_projection": round(one_year, 2),
        "five_year_projection": round(five_year, 2),
        "ten_year_projection": round(ten_year, 2),

        "category_forecast": category_projection,
        "subscription_forecast": subscription_projection,

        "habit_patterns": {
            "avg_weekday": round(avg_weekday, 2),
            "avg_weekend": round(avg_weekend, 2),
            "weekend_spike": habit_trends["weekend_spike"],
            "late_month_spike": habit_trends["late_month_spike"],
        },

        "risk_score": risk_score,
        "runway_days": runway_days,

        "warnings": warnings,
    })
