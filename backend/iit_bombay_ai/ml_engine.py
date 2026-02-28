from sklearn.ensemble import IsolationForest
from sklearn.preprocessing import StandardScaler


def anomaly_detection(df):

    features = df[["amount_inr", "hour_of_day"]].dropna()

    scaler = StandardScaler()
    scaled = scaler.fit_transform(features)

    model = IsolationForest(
        contamination=0.02,
        random_state=42
    )

    predictions = model.fit_predict(scaled)

    anomaly_count = (predictions == -1).sum()

    return {
        "total_anomalies_detected": int(anomaly_count),
        "anomaly_percentage": round((anomaly_count / len(df)) * 100, 2)
    }
