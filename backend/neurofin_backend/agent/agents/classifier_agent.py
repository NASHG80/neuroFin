import requests
import json

def classifier_agent(description: str):
    """
    Calls API classifier: /api/v1/classify
    """
    try:
        payload = {
            "description": description,
            "amount": 0,
            "direction": "debit"
        }

        r = requests.post(
            "http://api:4000/api/v1/classify",
            json=payload,
            timeout=5
        )

        if r.status_code == 200:
            return r.json().get("result")

        return {"error": "classifier_error", "status": r.status_code}

    except Exception as e:
        return {"error": str(e)}
