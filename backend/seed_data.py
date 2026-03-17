"""
Seed the database with test data for Smart P-CRM

Run this script after starting MongoDB:
    python seed_data.py
"""

from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from bson import ObjectId
import random

from db.connection import connect_db, close_db, get_db

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return pwd_context.hash(password)


def seed_database():
    """Seed database with test users and complaints"""
    
    # Connect to database
    connect_db()
    db = get_db()
    
    # Clear existing data
    print("\n🗑️  Clearing existing data...")
    db["users"].delete_many({})
    db["complaints"].delete_many({})
    
    # Create test users
    print("\n👥 Creating test users...")
    
    users = [
        {
            "name": "John Citizen",
            "email": "citizen@example.com",
            "phone": "9876543210",
            "password_hash": hash_password("citizen123"),
            "role": "citizen",
            "department": None,
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Alice Admin",
            "email": "admin@example.com",
            "phone": "9876543211",
            "password_hash": hash_password("admin123"),
            "role": "admin",
            "department": "Public Works",
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Bob Worker",
            "email": "worker@example.com",
            "phone": "9876543212",
            "password_hash": hash_password("worker123"),
            "role": "worker",
            "department": "Field Operations",
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Super Admin",
            "email": "superadmin@example.com",
            "phone": "9876543213",
            "password_hash": hash_password("superadmin123"),
            "role": "superadmin",
            "department": None,
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        }
    ]
    
    user_result = db["users"].insert_many(users)
    citizen_id = str(user_result.inserted_ids[0])
    worker_id = str(user_result.inserted_ids[2])
    
    print(f"✓ Created {len(users)} users")
    print(f"  - Citizen ID: {citizen_id}")
    print(f"  - Worker ID: {worker_id}")
    
    # Sample complaints
    print("\n📋 Creating sample complaints...")
    
    complaint_texts = [
        "Large pothole on Main Street causing traffic hazard",
        "Street light near park not working for 2 weeks",
        "Garbage overflowing from bins in residential area",
        "Water leak from municipal pipe on 5th Avenue",
        "Traffic signal at intersection malfunction",
        "Broken bench in community park",
        "Damaged road surface near school",
        "Street sign knocked down by storm",
        "Sewage backup in neighborhood",
        "Multiple streetlights out in downtown area"
    ]
    
    categories = ["pothole", "streetlight", "garbage", "water_leak", "traffic_signal", "public_amenity"]
    urgencies = ["low", "medium", "high"]
    statuses = ["submitted", "assigned", "in_progress", "completed", "approved"]
    
    complaints = []
    
    for i, text in enumerate(complaint_texts):
        complaint = {
            "citizen_id": ObjectId(citizen_id),
            "text": text,
            "category": random.choice(categories),
            "urgency": random.choice(urgencies),
            "status": random.choice(statuses),
            "sentiment": {"score": random.uniform(0, 1), "label": "negative"},
            "before_photo": None,
            "after_photo": None,
            "assigned_to": ObjectId(worker_id) if random.random() > 0.5 else None,
            "worker_notes": ["Initial inspection started"] if random.random() > 0.5 else [],
            "approval_notes": None,
            "deadline": datetime.now(timezone.utc) + timedelta(days=random.randint(3, 14)),
            "created_at": datetime.now(timezone.utc) - timedelta(days=random.randint(0, 30)),
            "updated_at": datetime.now(timezone.utc) - timedelta(days=random.randint(0, 15)),
            "rejected_reason": None
        }
        complaints.append(complaint)
    
    complaint_result = db["complaints"].insert_many(complaints)
    
    print(f"✓ Created {len(complaints)} complaints")
    
    # Print summary
    print("\n" + "="*60)
    print("📊 SEED DATA SUMMARY")
    print("="*60)
    
    print("\n🔐 TEST ACCOUNTS:")
    print("-" * 60)
    accounts = [
        ("Citizen", "citizen@example.com", "citizen123"),
        ("Admin", "admin@example.com", "admin123"),
        ("Worker", "worker@example.com", "worker123"),
        ("SuperAdmin", "superadmin@example.com", "superadmin123")
    ]
    
    for role, email, password in accounts:
        print(f"  {role:15} | {email:30} | {password}")
    
    print("\n✓ Database seeded successfully!")
    print("="*60 + "\n")
    
    close_db()


if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        print(f"\n❌ Error seeding database: {str(e)}")
        close_db()
