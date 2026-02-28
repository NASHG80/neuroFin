def format_response(intent, results):

    response_block = {
        "direct_response": "",
        "supporting_statistics": "",
        "contextual_insight": "",
        "recommendation": ""
    }

    # -------------------------
    # COMPARISON
    # -------------------------
    if intent == "comparison" and isinstance(results, dict):

        sorted_items = sorted(results.items(), key=lambda x: x[1], reverse=True)

        highest_label, highest_value = sorted_items[0]
        lowest_label, lowest_value = sorted_items[-1]

        values = [v for _, v in sorted_items]
        avg_value = round(sum(values) / len(values), 2)
        spread = round(highest_value - lowest_value, 2)

        ranking = ", ".join(
            [f"{label} ({value}%)" for label, value in sorted_items]
        )

        response_block["direct_response"] = (
            f"{highest_label} shows the highest value at {highest_value}%, "
            f"while {lowest_label} has the lowest at {lowest_value}%."
        )

        response_block["supporting_statistics"] = (
            f"Ranking — {ranking}. "
            f"Overall average: {avg_value}%. "
            f"Spread between highest and lowest: {spread}%."
        )

        response_block["contextual_insight"] = (
            "The spread magnitude indicates the degree of performance variation "
            "across categories."
        )

        if spread > 1:
            response_block["recommendation"] = (
                "Investigate operational differences across categories "
                "to identify performance drivers."
            )
        else:
            response_block["recommendation"] = (
                "Performance differences across categories are minimal."
            )

    # -------------------------
    # RISK ANALYSIS
    # -------------------------
    elif intent == "risk":

        percentage = results["percentage_flagged"]

        response_block["direct_response"] = (
            f"{percentage}% of high-value transactions are flagged for review."
        )

        response_block["supporting_statistics"] = (
            f"Threshold: ₹{results['high_value_threshold']}. "
            f"Flagged: {results['flagged_count']} out of "
            f"{results['total_high_value_transactions']} high-value transactions."
        )

        response_block["contextual_insight"] = (
            "Flag concentration within the top transaction tier "
            "indicates relative exposure at higher monetary values."
        )

        if percentage > 10:
            response_block["recommendation"] = (
                "Consider enhanced monitoring for high-value transaction flows."
            )
        else:
            response_block["recommendation"] = (
                "Current flag rate remains within moderate bounds."
            )

    # -------------------------
    # DEFAULT FALLBACK
    # -------------------------
    else:
        response_block["direct_response"] = "Analysis completed."
        response_block["supporting_statistics"] = str(results)

    return {
        "intent_detected": intent,
        "results": results,
        "answer": response_block
    }
