import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from analytics_engine import compute_full_analytics
from llm import generate_llm_response
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ✅ CORS (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

CSV_PATH = "upi_transactions_2024.csv"


# =====================================================
# SAFE DATA LOADER (FULLY ROBUST)
# =====================================================
def load_and_clean_data():

    try:
        df = pd.read_csv(CSV_PATH, sep=",", engine="python")
    except Exception as e:
        raise Exception(f"CSV Load Error: {str(e)}")

    # -------------------------------------------------
    # CLEAN COLUMN NAMES
    # -------------------------------------------------
    df.columns = df.columns.str.strip()

    # -------------------------------------------------
    # REQUIRED BASE COLUMNS
    # -------------------------------------------------
    base_required = [
        "amount (INR)",
        "transaction_status",
        "transaction type",
        "device_type",
        "network_type",
        "fraud_flag",
        "sender_age_group",
        "sender_state",
        "timestamp"
    ]

    missing = [col for col in base_required if col not in df.columns]
    if missing:
        raise Exception(f"Missing required columns: {missing}")

    # -------------------------------------------------
    # ROBUST TIMESTAMP PARSING
    # -------------------------------------------------
    df["timestamp"] = df["timestamp"].astype(str).str.strip()

    df["timestamp"] = pd.to_datetime(
        df["timestamp"],
        dayfirst=True,
        errors="coerce"
    )

    if df["timestamp"].notna().sum() == 0:
        raise Exception("Timestamp parsing failed for all rows.")

    df = df[df["timestamp"].notna()]

    df["hour_of_day"] = df["timestamp"].dt.hour
    df["day_of_week"] = df["timestamp"].dt.day_name()
    df["is_weekend"] = df["timestamp"].dt.weekday.apply(
        lambda x: 1 if x >= 5 else 0
    )

    # -------------------------------------------------
    # NUMERIC CLEANING
    # -------------------------------------------------
    df["amount (INR)"] = pd.to_numeric(df["amount (INR)"], errors="coerce")
    df = df.dropna(subset=["amount (INR)", "hour_of_day"])

    # -------------------------------------------------
    # STANDARDIZE STATUS
    # -------------------------------------------------
    df["transaction_status"] = (
        df["transaction_status"]
        .astype(str)
        .str.strip()
        .str.lower()
        .replace({
            "success": "Success",
            "failed": "Failed"
        })
    )

    # -------------------------------------------------
    # FRAUD FLAG CLEANING
    # -------------------------------------------------
    df["fraud_flag"] = (
        df["fraud_flag"]
        .astype(str)
        .str.strip()
        .str.lower()
        .apply(lambda x: 1 if x in ["1", "true", "yes"] else 0)
    )

    return df


# =====================================================
# REQUEST MODEL
# =====================================================
class QueryRequest(BaseModel):
    question: str = None
    message: str = None


# =====================================================
# ROOT CHECK
# =====================================================
@app.get("/")
def root():
    return {"message": "UPI Enterprise Analytics AI Running"}


# =====================================================
# MAIN ANALYTICS ENDPOINT
# =====================================================
@app.post("/ask")
def ask_question(request: QueryRequest):

    try:
        # Support both 'question' and 'message' keys from frontend
        user_question = request.question or request.message
        if not user_question:
            raise HTTPException(status_code=400, detail="question or message is required")

        df = load_and_clean_data()

        results = compute_full_analytics(df)

        answer = generate_llm_response(
            user_query=user_question,
            results=results
        )

        return {
            "answer": answer,
            "rows_scanned": len(df),
            "analytics_summary": results,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))