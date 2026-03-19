from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = "pcrm_db"

client = None
db = None


def connect_db():
    """Connect to MongoDB Atlas"""
    global client, db
    try:
        client = MongoClient(MONGO_URI, serverSelectionTimeoutMS=10000)
        # Verify connection
        client.admin.command('ping')
        db = client[DB_NAME]
        
        # Ensure collections exist with proper indexes
        _initialize_collections()
        
        print("✅ MongoDB Atlas Connected!")
        return db
    except ServerSelectionTimeoutError as e:
        print(f"❌ Failed to connect to MongoDB Atlas: {e}")
        raise
    except Exception as e:
        print(f"❌ MongoDB Connection Error: {e}")
        raise


def _initialize_collections():
    """Initialize required collections"""
    collections_needed = [
        "users",
        "complaints", 
        "notifications",
        "departments",
        "reraise_history"
    ]
    
    existing = db.list_collection_names()
    for collection in collections_needed:
        if collection not in existing:
            db.create_collection(collection)
            print(f"   📋 Created collection: {collection}")
    
    # Create indexes
    db["users"].create_index("email", unique=True)
    db["complaints"].create_index("category")
    db["complaints"].create_index("status")
    db["complaints"].create_index("citizen_id")
    print(f"   🔑 Indexes created")


def close_db():
    """Close MongoDB connection"""
    global client
    if client:
        client.close()
        print("✅ MongoDB connection closed")


def get_db():
    """Get database instance"""
    return db
