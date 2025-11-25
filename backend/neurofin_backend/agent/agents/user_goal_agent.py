import requests
import os

API_BASE = os.getenv("NEUROFIN_API", "http://api:4000")

def get_user_goal_summary(user_id: str):
    """
    Fetch user financial goals from API (or fallback).
    """
    try:
        r = requests.get(f"{API_BASE}/api/v1/goals/{user_id}", timeout=5)

        if r.status_code == 200:
            return r.json()

        return {"goal": None, "status": "no_goal_found"}

    except Exception as e:
        return {"error": str(e), "goal": None}
