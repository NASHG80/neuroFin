import pandas as pd
import numpy as np
from scipy import stats
from scipy.stats import chi2_contingency, pointbiserialr
from sklearn.ensemble import IsolationForest, RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    roc_auc_score,
    precision_score,
    recall_score,
    f1_score,
    roc_curve
)
from sklearn.feature_selection import mutual_info_classif
import xgboost as xgb


def compute_full_analytics(df):

    # =====================================================
    # COLUMN REFERENCES
    # =====================================================
    amount_col = "amount (INR)"
    status_col = "transaction_status"
    type_col = "transaction type"
    device_col = "device_type"
    network_col = "network_type"
    fraud_col = "fraud_flag"
    hour_col = "hour_of_day"
    weekend_col = "is_weekend"
    age_col = "sender_age_group"
    state_col = "sender_state"

    # Safe numeric conversion
    df[amount_col] = pd.to_numeric(df[amount_col], errors="coerce")
    df[hour_col] = pd.to_numeric(df[hour_col], errors="coerce")
    df = df.dropna(subset=[amount_col, hour_col])

    total = len(df)

    # =====================================================
    # DESCRIPTIVE STATISTICS
    # =====================================================
    avg = df[amount_col].mean()
    median = df[amount_col].median()
    std = df[amount_col].std()

    margin_error = stats.sem(df[amount_col]) * stats.t.ppf(
        (1 + 0.95) / 2., total - 1
    )

    success_rate = (df[status_col] == "Success").mean() * 100
    failure_rate = (df[status_col] == "Failed").mean() * 100

    # =====================================================
    # FAILURE BREAKDOWN
    # =====================================================
    failure_by_type = (
        df.groupby(type_col)[status_col]
        .apply(lambda x: (x == "Failed").mean() * 100)
        .to_dict()
    )

    # =====================================================
    # TEMPORAL ANALYSIS
    # =====================================================
    hourly_counts = df.groupby(hour_col).size()

    if hourly_counts.empty:
        peak_hour = None
        concentration_index = 0
    else:
        peak_hour = int(hourly_counts.idxmax())
        proportions = hourly_counts / total
        concentration_index = float((proportions ** 2).sum())

    
               
    peak_hour = int(hourly_counts.idxmax())

    proportions = hourly_counts / total
    concentration_index = float((proportions ** 2).sum())

    # =====================================================
    # SEGMENTATION
    # =====================================================
    most_active_age = df[age_col].value_counts().idxmax()
    most_active_state = df[state_col].value_counts().idxmax()

    # =====================================================
    # CHI-SQUARE CORRELATION
    # =====================================================
    contingency = pd.crosstab(df[network_col], df[status_col])
    chi2, p, dof, _ = chi2_contingency(contingency)

    n = contingency.sum().sum()
    cramers_v = np.sqrt(chi2 / (n * (min(contingency.shape) - 1)))

    # =====================================================
    # FRAUD RISK ANALYSIS
    # =====================================================
    overall_fraud = df[fraud_col].mean() * 100

    threshold = df[amount_col].quantile(0.9)
    high_value = df[df[amount_col] >= threshold]
    high_value_fraud = high_value[fraud_col].mean() * 100

    risk_lift = (
        high_value_fraud / overall_fraud
        if overall_fraud != 0 else 0
    )
        # =============================
    # ENTERPRISE RISK SEGMENTATION
    # =============================

    overall_fraud_rate = df[fraud_col].mean() * 100

    def compute_risk_segment(column_name):

        segment_total = df.groupby(column_name).size()
        segment_fraud_rate = (
            df.groupby(column_name)[fraud_col].mean() * 100
        )

        segment_share = (segment_total / total) * 100

        risk_lift = (
            segment_fraud_rate / overall_fraud_rate
            if overall_fraud_rate != 0 else 0
        )

        result = {}

        for segment in segment_total.index:
            result[str(segment)] = {
                "transaction_share_percent": round(segment_share.get(segment, 0), 2),
                "fraud_rate_percent": round(segment_fraud_rate.get(segment, 0), 2),
                "risk_lift": round(
                    (segment_fraud_rate.get(segment, 0) / overall_fraud_rate)
                    if overall_fraud_rate != 0 else 0,
                    2
                )
            }

        return result


    # -----------------------------
    # Amount Deciles
    # -----------------------------
    df["amount_decile"] = pd.qcut(
        df[amount_col],
        10,
        duplicates="drop"
    )


    risk_segmentation = {
        "by_hour": compute_risk_segment(hour_col),
        "by_weekend_flag": compute_risk_segment(weekend_col),
        "by_device_type": compute_risk_segment(device_col),
        "by_network_type": compute_risk_segment(network_col),
        "by_amount_decile": compute_risk_segment("amount_decile"),
        "by_age_group": compute_risk_segment(age_col),
        "by_state": compute_risk_segment(state_col),
        "by_sender_bank": compute_risk_segment("sender_bank"),
        "by_receiver_bank": compute_risk_segment("receiver_bank"),
        "by_merchant_category": compute_risk_segment("merchant_category")
    }
        # =============================
    # TIME-OF-DAY RISK BUCKETS
    # =============================

    def categorize_time(hour):
        if 0 <= hour <= 5:
            return "Late_Night"
        elif 6 <= hour <= 11:
            return "Morning"
        elif 12 <= hour <= 17:
            return "Afternoon"
        else:
            return "Evening"

    df["time_bucket"] = df[hour_col].apply(categorize_time)

    time_bucket_total = df.groupby("time_bucket").size()
    time_bucket_fraud = df.groupby("time_bucket")[fraud_col].mean() * 100

    time_bucket_risk = {}

    for bucket in time_bucket_total.index:
        fraud_rate = time_bucket_fraud.get(bucket, 0)
        lift = fraud_rate / overall_fraud_rate if overall_fraud_rate != 0 else 0

        time_bucket_risk[bucket] = {
            "transaction_share_percent": round(
                (time_bucket_total[bucket] / total) * 100, 2
            ),
            "fraud_rate_percent": round(fraud_rate, 2),
            "risk_lift": round(lift, 2)
        }


    # =====================================================
    # POINT-BISERIAL CORRELATION (Amount vs Fraud)
    # =====================================================
    pb_corr, pb_p = pointbiserialr(df[fraud_col], df[amount_col])

    # =====================================================
    # ANOMALY DETECTION (Isolation Forest)
    # =====================================================
    iso = IsolationForest(contamination=0.02, random_state=42)
    iso.fit(df[[amount_col, hour_col]])
    preds = iso.predict(df[[amount_col, hour_col]])
    anomaly_count = int((preds == -1).sum())

    # =====================================================
    # SUPERVISED FRAUD MODELS
    # =====================================================
    features = [amount_col, hour_col]
    X = df[features]
    y = df[fraud_col].astype(int)

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    # Logistic Regression
    log_model = LogisticRegression(max_iter=1000)
    log_model.fit(X_train, y_train)
    log_pred = log_model.predict(X_test)

    log_auc = roc_auc_score(y_test, log_model.predict_proba(X_test)[:,1])

    # Random Forest
    rf_model = RandomForestClassifier(n_estimators=200, random_state=42)
    rf_model.fit(X_train, y_train)
    rf_pred = rf_model.predict(X_test)
    rf_auc = roc_auc_score(y_test, rf_model.predict_proba(X_test)[:,1])

    # XGBoost
    xgb_model = xgb.XGBClassifier(eval_metric="logloss")
    xgb_model.fit(X_train, y_train)
    xgb_pred = xgb_model.predict(X_test)

    xgb_auc = roc_auc_score(y_test, xgb_model.predict_proba(X_test)[:,1])
    precision = precision_score(y_test, xgb_pred)
    recall = recall_score(y_test, xgb_pred)
    f1 = f1_score(y_test, xgb_pred)

    # KS Statistic
    fpr, tpr, thresholds = roc_curve(
        y_test,
        xgb_model.predict_proba(X_test)[:,1]
    )
    ks_stat = max(tpr - fpr)

    # =====================================================
    # MUTUAL INFORMATION
    # =====================================================
    mi_scores = mutual_info_classif(X, y)
    mi_dict = {
        features[i]: round(mi_scores[i], 4)
        for i in range(len(features))
    }

    # =====================================================
    # RETURN FULL ENTERPRISE OUTPUT
    # =====================================================
    return {
        "total_transactions": total,

        # Descriptive
        "average_amount": round(avg, 2),
        "median_amount": round(median, 2),
        "std_dev": round(std, 2),
        "confidence_interval_95": [
            round(avg - margin_error, 2),
            round(avg + margin_error, 2)
        ],
        "success_rate_percent": round(success_rate, 2),
        "failure_rate_percent": round(failure_rate, 2),

        # Breakdown
        "failure_by_transaction_type": {
            k: round(v, 2) for k, v in failure_by_type.items()
        },

        # Temporal
        "peak_hour": peak_hour,
        "concentration_index": round(concentration_index, 4),

        # Segmentation
        "most_active_age_group": most_active_age,
        "most_active_state": most_active_state,

        # Correlation
        "chi_square": round(chi2, 2),
        "p_value": round(p, 6),
        "cramers_v": round(cramers_v, 4),

        # Fraud Risk
        "overall_fraud_rate": round(overall_fraud, 2),
        "high_value_fraud_rate": round(high_value_fraud, 2),
        "risk_lift": round(risk_lift, 2),
        "enterprise_risk_segmentation": risk_segmentation,
        "time_of_day_risk": time_bucket_risk,



        # Correlation Strength
        "point_biserial_corr": round(pb_corr, 4),
        "point_biserial_p_value": round(pb_p, 6),

        # Anomaly
        "anomaly_count": anomaly_count,

        # Model Metrics
        "logistic_auc": round(log_auc, 4),
        "random_forest_auc": round(rf_auc, 4),
        "xgboost_auc": round(xgb_auc, 4),
        "precision": round(precision, 4),
        "recall": round(recall, 4),
        "f1_score": round(f1, 4),
        "ks_statistic": round(ks_stat, 4),

        # Feature Strength
        "mutual_information": mi_dict
         

    }
