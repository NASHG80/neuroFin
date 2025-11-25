import requests
import numpy as np
from datetime import datetime, timedelta

API_BASE = "http://api:4000"      # Node API
FORECAST_BASE = "http://forecast:5000"  # Python forecast service


def forecaster_agent(user_id: str) -> dict:
    """
    Uses smoothed data + forecast service + simple trend logic
    to estimate user's future financial condition.
    """

    # ---- 1) Fetch smoothed historical values ----
    try:
        r = requests.get(f"{API_BASE}/api/v1/smoothed/{user_id}?limit=30", timeout=8)
        smoothed = r.json() if r.status_code == 200 else []
    except Exception:
        smoothed = []

    balances = []
    dates = []

    for entry in smoothed:
        bal = entry.get("smoothed_balance") or entry.get("balance")
        ts = entry.get("as_of") or entry.get("timestamp")
        if bal is None or ts is None:
            continue
        try:
            balances.append(float(bal))
            dates.append(datetime.fromisoformat(ts.replace("Z", "")))
        except Exception:
            continue

    # Fallback if no smoothed data
    if len(balances) < 3:
        return {
            "summary": "Insufficient data for forecast",
            "trend": "unknown",
            "predicted_next_30_days": [],
            "burn_rate": 0,
            "runout_date": None
        }

    # ---- 2) Fetch forecast from ML service ----
    try:
        r = requests.get(f"{FORECAST_BASE}/forecast/{user_id}", timeout=10)
        fcast = r.json() if r.status_code == 200 else {}
    except Exception:
        fcast = {}

    fcast_values = fcast.get("forecast", [])
    fcast_dates = fcast.get("dates", [])

    # ---- 3) Compute trend direction ----
    # simple slope calculation
    x = np.arange(len(balances))
    y = np.array(balances)

    slope = np.polyfit(x, y, 1)[0]

    if slope > 5:
        trend = "UPWARD"
    elif slope < -5:
        trend = "DOWNWARD"
    else:
        trend = "STABLE"

    # ---- 4) Compute burn rate (daily change) ----
    daily_diffs = np.diff(y)
    burn_rate = float(np.mean(daily_diffs))  # positive = gaining, negative = losing

    # ---- 5) Predict runout date ----
    current_balance = y[-1]
    runout_date = None

    if burn_rate < -50:  # losing ₹50/day or more
        days_left = int(current_balance / abs(burn_rate))
        runout_date = (datetime.utcnow() + timedelta(days=days_left)).isoformat()

    # ---- Prepare next 30 days data ----
    next_30 = []
    for i, val in enumerate(fcast_values[:30]):
        date_str = fcast_dates[i] if i < len(fcast_dates) else f"+{i}d"
        next_30.append({
            "date": date_str,
            "predicted_balance": val
        })

    return {
        "summary": f"Trend: {trend}, Burn rate: {round(burn_rate, 2)}",
        "trend": trend,
        "burn_rate": round(burn_rate, 2),
        "current_balance": round(float(current_balance), 2),
        "runout_date": runout_date,
        "predicted_next_30_days": next_30
    }
