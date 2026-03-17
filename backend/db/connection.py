from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "smart_pcrm"

client = None
db = None


def connect_db():
    """Connect to MongoDB"""
    global client, db
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=5000)
        # Verify connection
        client.admin.command('ping')
        db = client[DB_NAME]
        print(f"✓ Connected to MongoDB: {DB_NAME}")
        return db
    except ServerSelectionTimeoutError:
        print("✗ Failed to connect to MongoDB")
        raise


def close_db():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("✓ Closed MongoDB connection")


def get_db():
    """Get database instance"""
    return db
