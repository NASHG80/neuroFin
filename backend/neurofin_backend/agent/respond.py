# agent/respond.py
import os
import json
import importlib
from flask import Blueprint, request, jsonify
from dotenv import load_dotenv

load_dotenv()

bp = Blueprint("respond_bp", __name__)

# -----------------------
# Fallback stubs (safe)
# -----------------------
def fetch_user_context(uid):
    return {"smoothed": [], "forecast": {}}

def call_risk_agent(uid, ctx):
    return {"error": "risk-agent-not-available"}

def call_llm(prompt):
    """
    HTTP-first LLM call with robust retry/backoff for 429s, and legacy fallback.
    Returns assistant text or an informative error string.
    """
    import os, time, random, json, requests

    key = os.getenv("OPENAI_API_KEY") or os.getenv("OPENAI_KEY")
    model = os.getenv("LLM_MODEL", os.getenv("OPENAI_MODEL", "gpt-4o-mini"))
    if not key:
        return "LLM not configured: OPENAI_API_KEY missing"

    url = "https://api.openai.com/v1/responses"
    headers = {"Authorization": f"Bearer {key}", "Content-Type": "application/json"}

    # Retry/backoff params (tweak via env if desired)
    max_attempts = int(os.getenv("OPENAI_RATE_LIMIT_RETRIES", "5"))
    base_backoff = float(os.getenv("OPENAI_BACKOFF_BASE", "1.0"))  # seconds
    max_backoff = float(os.getenv("OPENAI_BACKOFF_MAX", "30.0"))
    max_tokens = int(os.getenv("OPENAI_MAX_OUTPUT_TOKENS", "512"))

    payload = {"model": model, "input": prompt, "max_output_tokens": max_tokens}

    attempt = 0
    last_exc = None
    while attempt < max_attempts:
        attempt += 1
        try:
            r = requests.post(url, headers=headers, json=payload, timeout=20)
            # If success (200), parse JSON and return text
            if r.status_code == 200:
                j = r.json()
                # Extract text robustly (same logic as earlier)
                out_text = ""
                output = j.get("output") or j.get("data") or j.get("choices")
                if isinstance(output, list):
                    for item in output:
                        if isinstance(item, dict):
                            content = item.get("content") or item.get("text") or item.get("message") or item.get("output_text")
                            if isinstance(content, list):
                                for c in content:
                                    if isinstance(c, dict) and "text" in c:
                                        out_text += c.get("text", "")
                                    elif isinstance(c, str):
                                        out_text += c
                            elif isinstance(content, dict):
                                out_text += content.get("text", "") or str(content)
                            elif isinstance(content, str):
                                out_text += content
                        elif isinstance(item, str):
                            out_text += item
                if not out_text:
                    out_text = j.get("output_text") or ""
                    if not out_text and isinstance(j.get("choices"), list):
                        try:
                            first = j["choices"][0]
                            out_text = first.get("message", {}).get("content") or first.get("text") or ""
                        except Exception:
                            out_text = ""
                out_text = (out_text or "").strip()
                return out_text or json.dumps(j)[:2000]

            # Handle rate limit: 429
            if r.status_code == 429:
                retry_after = None
                try:
                    # prefer seconds
                    retry_after = int(r.headers.get("Retry-After") or 0)
                except Exception:
                    retry_after = None
                if retry_after and retry_after > 0:
                    sleep_for = min(max_backoff, retry_after)
                else:
                    # exponential backoff with jitter
                    sleep_for = min(max_backoff, base_backoff * (2 ** (attempt - 1)) * (0.5 + random.random()))
                last_exc = f"HTTP 429 attempt {attempt}"
                time.sleep(sleep_for)
                # optional: progressively reduce tokens to reduce usage
                if payload.get("max_output_tokens", 0) > 64:
                    payload["max_output_tokens"] = max(64, payload["max_output_tokens"] // 2)
                continue

            # For 5xx errors, backoff and retry
            if 500 <= r.status_code < 600:
                sleep_for = min(max_backoff, base_backoff * (2 ** (attempt - 1)) * (0.5 + random.random()))
                last_exc = f"HTTP {r.status_code} attempt {attempt}"
                time.sleep(sleep_for)
                continue

            # For other non-200 errors, try legacy fallback immediately
            last_exc = f"HTTP {r.status_code}: {r.text[:300]}"
            break

        except requests.exceptions.RequestException as re:
            last_exc = re
            sleep_for = min(max_backoff, base_backoff * (2 ** (attempt - 1)) * (0.5 + random.random()))
            time.sleep(sleep_for)
            continue

    # If we reach here, HTTP path failed repeatedly — attempt legacy openai if available
    try:
        import openai as _openai_legacy
        if key:
            try:
                _openai_legacy.api_key = key
            except Exception:
                pass
        resp = _openai_legacy.ChatCompletion.create(
            model=model,
            messages=[{"role": "system", "content": "You are NeuroFin Assistant."},
                      {"role": "user", "content": prompt}],
            max_tokens=payload.get("max_output_tokens", 256),
        )
        try:
            return resp.choices[0].message.content
        except Exception:
            return (resp.get("choices") or [{}])[0].get("message", {}).get("content") or (resp.get("choices") or [{}])[0].get("text") or str(resp)
    except Exception as legacy_e:
        # Return combined error (HTTP attempts + legacy attempt)
        return f"LLM call failed: http_attempts_last={last_exc} | legacy_err={type(legacy_e).__name__}:{legacy_e}"


# -----------------------
# Lazy loader to avoid circular import
# -----------------------
def _ensure_langgraph_agent_loaded():
    """
    Attempt to import langgraph_agent and override local stubs.
    Safe to call repeatedly; it only replaces stubs if import succeeds.
    """
    global fetch_user_context, call_risk_agent, call_llm
    try:
        lga = importlib.import_module("langgraph_agent")
        # override only if attributes exist in the module
        if hasattr(lga, "fetch_user_context"):
            fetch_user_context = lga.fetch_user_context
        if hasattr(lga, "call_risk_agent"):
            call_risk_agent = lga.call_risk_agent
        if hasattr(lga, "call_llm"):
            call_llm = lga.call_llm
    except Exception:
        # If import fails, keep fallbacks. We don't log here to avoid noise during import-time.
        pass

# -----------------------
# RAG retriever fallback
# -----------------------
try:
    from rag import retrieve as rag_retrieve
except Exception:
    # fallback stub if rag not yet ready
    def rag_retrieve(user_id, k=5):
        return []

# -----------------------
# Blueprint handler
# -----------------------
@bp.route("/agent/respond", methods=["POST"])
def respond():
    payload = request.json or {}
    user_id = payload.get("user_id")
    # support both "question" and "input" keys
    question = payload.get("question") or payload.get("input") or payload.get("text")
    if not user_id or not question:
        return jsonify({"error":"missing user_id or question"}), 400

    # ensure langgraph_agent helpers are loaded (avoids circular import at module load)
    _ensure_langgraph_agent_loaded()

    # 1) gather context
    ctx = fetch_user_context(user_id)

    # 2) call risk agent (best-effort)
    try:
        risk_context = {
            "short_text": question,
            "smoothed_snapshot": ctx.get("smoothed", [])[:5],
            "forecast_summary": ctx.get("forecast", {})
        }
        risk = call_risk_agent(user_id, risk_context)
    except Exception as e:
        risk = {"error": str(e)}

    # 3) RAG retrieval
    try:
        retrieved = rag_retrieve(user_id, k=5) or []
    except Exception as e:
        retrieved = []
        # print is intentionally minimal to surface errors during dev
        print("RAG retrieval error:", e)

    retr_texts = [f"- {r.get('text')} (meta={r.get('meta')})" for r in retrieved]
    retr_context = "\n".join(retr_texts) if retr_texts else "(no retrieval results)"

    # 4) build prompt
    prompt = f"""
User question: {question}

Retrieved context:
{retr_context}

Smoothed snapshot:
{ctx.get('smoothed', [])[:3]}

Forecast snapshot:
{ctx.get('forecast', {})}

Risk agent output:
{json.dumps(risk, default=str)}

Provide a concise, empathetic financial explanation.
If risk severity is medium or high, include a two-step actionable suggestion.
"""

    # 5) call the LLM
    try:
        answer = call_llm(prompt)
    except Exception as e:
        answer = f"LLM call failed: {e}"

    return jsonify({"answer": answer, "risk": risk, "retrieved_count": len(retrieved)})
