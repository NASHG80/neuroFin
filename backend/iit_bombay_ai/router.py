from analytics_engine import (
    descriptive_bill_average,
    compare_device_failure,
    peak_hour_food,
    p2p_by_age,
    network_success_correlation,
    high_value_flagged_percentage
)

from ml_engine import anomaly_detection
from llm import generate_llm_response


def route_query(df, intent, query):

    if intent == "descriptive":
        results = descriptive_bill_average(df)

    elif intent == "comparison":
        results = compare_device_failure(df)

    elif intent == "temporal":
        results = peak_hour_food(df)

    elif intent == "segmentation":
        results = p2p_by_age(df)

    elif intent == "correlation":
        results = network_success_correlation(df)

    elif intent == "risk":
        results = high_value_flagged_percentage(df)

    elif intent == "anomaly":
        results = anomaly_detection(df)

    else:
        return {"error": "Intent not supported"}

    paragraph = generate_llm_response(query, results)

    return {
        "intent_detected": intent,
        "results": results,
        "answer": paragraph
    }
