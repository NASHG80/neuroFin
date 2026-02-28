def detect_intent(query: str):

    q = query.lower()

    if "average" in q:
        return "descriptive"

    if "compare" in q or "between" in q:
        return "comparison"

    if "peak" in q or "hour" in q:
        return "temporal"

    if "age group" in q:
        return "segmentation"

    if "relationship" in q or "correlation" in q:
        return "correlation"

    if "percentage" in q or "flagged" in q or "high-value" in q:
        return "risk"

    if "anomaly" in q or "outlier" in q:
        return "anomaly"

    return "descriptive"
