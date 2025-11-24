# api/src/memory.py
import datetime
from pymongo import MongoClient
import os

MONGO_URI = os.getenv("MONGO_URI", "mongodb://mongodb:27017")
MONGO_DB = os.getenv("MONGO_DB", "neurofin")

client = MongoClient(MONGO_URI)
db = client[MONGO_DB]

memory_profiles = db["memory_profiles"]      # user profile
memory_goals = db["memory_goals"]            # user goals
memory_patterns = db["memory_patterns"]       # spending patterns


# ------------------ USER PROFILE ------------------ #
def get_user_profile(user_id):
    prof = memory_profiles.find_one({"user_id": user_id})
    if not prof:
        prof = {"user_id": user_id, "created_at": datetime.datetime.utcnow()}
        memory_profiles.insert_one(prof)
    return prof


def update_user_profile(user_id, key, value):
    memory_profiles.update_one(
        {"user_id": user_id},
        {"$set": {key: value}},
        upsert=True
    )
    return True


# ------------------ GOALS MEMORY ------------------ #
def add_goal(user_id, title, amount, deadline):
    goal = {
        "user_id": user_id,
        "title": title,
        "amount": amount,
        "deadline": deadline,
        "created_at": datetime.datetime.utcnow()
    }
    memory_goals.insert_one(goal)
    return goal


def get_goals(user_id):
    return list(memory_goals.find({"user_id": user_id}))


# ------------------ SPENDING PATTERN MEMORY ------------------ #
def record_spending_pattern(user_id, pattern_dict):
    """
    pattern_dict example:
    {
       "top_categories": ["Groceries", "Food & Drink"],
       "burn_rate": 13450,
       "monthly_spend_avg": 12500,
       "salary_cycle": "1st of every month"
    }
    """
    memory_patterns.update_one(
        {"user_id": user_id},
        {"$set": {**pattern_dict, "updated_at": datetime.datetime.utcnow()}},
        upsert=True
    )
    return True


def get_spending_pattern(user_id):
    return memory_patterns.find_one({"user_id": user_id}) or {}
