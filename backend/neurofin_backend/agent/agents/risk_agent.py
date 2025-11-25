import os
import requests

RISK_AGENT_URL = os.getenv("RISK_AGENT_URL", "http://risk:7000/agent/risk/check")

def risk_agent(user_id: str):
    try:
        payload = {
            "user_id": user_id,
            "options": {"explain": True}
        }
        r = requests.post(RISK_AGENT_URL, json=payload, timeout=5)
        return r.json()

    except Exception as e:
        return {"error": str(e), "severity": "unknown"}
