from flask import Flask, request, jsonify, make_response
import os
from agents.router_agent import router_agent
from api.src.memory import load_csv_once

app = Flask(__name__)

# ------------------------------------------------------------------
# 🔥 UNIVERSAL OPTIONS HANDLER — THIS FIXES ALL CORS ISSUES
# ------------------------------------------------------------------
@app.before_request
def handle_any_options():
    if request.method == "OPTIONS":
        response = make_response(jsonify({"status": "ok"}), 200)
        response.headers["Access-Control-Allow-Origin"] = "*"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
        return response
    return None


# ------------------------------------------------------------------
# Add CORS headers to EVERY response
# ------------------------------------------------------------------
@app.after_request
def add_headers(resp):
    resp.headers["Access-Control-Allow-Origin"] = "*"
    resp.headers["Access-Control-Allow-Headers"] = "Content-Type, Authorization"
    resp.headers["Access-Control-Allow-Methods"] = "GET, POST, OPTIONS"
    return resp


# ------------------------------------------------------------------
# MAIN ENDPOINT
# ------------------------------------------------------------------
@app.route("/agent/ask", methods=["POST"])
def ask():
    data = request.json or {}

    user_id = data.get("user_id")
    message = data.get("message") or data.get("input")

    if not user_id or not message:
        return jsonify({"error": "user_id and message required"}), 400

    try:
        result = router_agent(user_id, message)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": "internal_error", "detail": str(e)}), 500


# ------------------------------------------------------------------
# HEALTH
# ------------------------------------------------------------------
@app.route("/health")
def health():
    return jsonify({"status": "ok"})


# ------------------------------------------------------------------
# RUN
# ------------------------------------------------------------------
if __name__ == "__main__":
    print("⚡ Loading CSV...")
    load_csv_once()

    port = int(os.getenv("PORT", 7001))
    print(f"🚀 NeuroFin backend running on http://localhost:{port}")

    app.run(
        host="0.0.0.0",
        port=port,
        debug=False,
        use_reloader=False
    )
