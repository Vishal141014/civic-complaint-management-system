"""
Seed MongoDB Atlas database with test data for Smart P-CRM

Run this script after starting MongoDB:
    python seed_data.py
"""

from datetime import datetime, timedelta, timezone
from passlib.context import CryptContext
from bson import ObjectId
import random

from db.connection import connect_db, close_db, get_db
from departments import DELHI_DEPARTMENTS

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
    db["departments"].delete_many({})
    db["notifications"].delete_many({})
    db["reraise_history"].delete_many({})
    
    # Create test users with specific credentials
    print("\n👥 Creating test users...")
    
    users = [
        # Main test users
        {
            "name": "Test Citizen",
            "email": "citizen@test.com",
            "phone": "9876543210",
            "password_hash": hash_password("pass123"),
            "role": "citizen",
            "department": None,
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "DJB Admin",
            "email": "admin@djb.com",
            "phone": "9876543211",
            "password_hash": hash_password("pass123"),
            "role": "admin",
            "department": "jal_board",
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "DJB Worker",
            "email": "worker@djb.com",
            "phone": "9876543212",
            "password_hash": hash_password("pass123"),
            "role": "worker",
            "department": "jal_board",
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        },
        {
            "name": "Super Admin",
            "email": "super@pcrm.com",
            "phone": "9876543213",
            "password_hash": hash_password("pass123"),
            "role": "superadmin",
            "department": None,
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        }
    ]
    
    # Create one admin user for each of the 15 Delhi departments
    dept_admin_credentials = []
    for idx, dept in enumerate(DELHI_DEPARTMENTS, start=1):
        dept_id = f"DA{str(idx).zfill(3)}"  # DA001, DA002, etc.
        admin_email = f"admin_{dept['id']}@delhi.gov.in"
        admin_password = "pass123"
        admin_name = f"{dept['name']} Admin"
        
        users.append({
            "name": admin_name,
            "email": admin_email,
            "phone": f"9876543{500 + idx}",
            "password_hash": hash_password(admin_password),
            "role": "admin",
            "department": dept['id'],
            "dept_id": dept_id,
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        })
        
        # Store credentials for display
        dept_admin_credentials.append({
            "dept_name": dept['name'],
            "dept_id": dept['id'],
            "admin_id": dept_id,
            "email": admin_email,
            "password": admin_password
        })
    
    # Add 2 worker users
    for i in range(2):
        users.append({
            "name": f"Field Worker {i+2}",
            "email": f"worker{i+2}@pcrm.com",
            "phone": f"98765432{20+i}",
            "password_hash": hash_password("pass123"),
            "role": "worker",
            "department": random.choice([d['id'] for d in DELHI_DEPARTMENTS]),
            "is_active": True,
            "created_at": datetime.now(timezone.utc)
        })
    
    user_result = db["users"].insert_many(users)
    citizen_id = str(user_result.inserted_ids[0])
    worker_id = str(user_result.inserted_ids[2])
    
    print(f"✓ Created {len(users)} users (4 test + 15 dept admins + 2 workers)")
    
    # Sample complaints
    print("📋 Creating sample complaints...")
    
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
    
    # Print detailed summary
    print("\n" + "="*80)
    print("📊 SEED DATA SUMMARY - MongoDB Atlas")
    print("="*80)
    
    print("\n✅ DATABASE COLLECTIONS:")
    print("-" * 80)
    for collection in ["users", "complaints", "notifications", "departments", "reraise_history"]:
        count = db[collection].count_documents({})
        print(f"  {collection:25} | {count:5} documents")
    
    users_count = db["users"].count_documents({})
    complaints_count = db["complaints"].count_documents({})
    
    print(f"\n🔐 TEST ACCOUNTS:")
    print("-" * 80)
    accounts = [
        ("Citizen", "citizen@test.com", "pass123"),
        ("DJB Admin", "admin@djb.com", "pass123"),
        ("DJB Worker", "worker@djb.com", "pass123"),
        ("SuperAdmin", "super@pcrm.com", "pass123")
    ]
    
    for role, email, password in accounts:
        print(f"  {role:15} | {email:30} | {password}")
    
    print("\n🏛️  DEPARTMENT ADMIN ACCOUNTS (15 Delhi Departments):")
    print("-" * 80)
    print(f"  {'Department':40} | {'Email':35} | {'Password'}")
    print("-" * 80)
    for cred in dept_admin_credentials:
        print(f"  {cred['dept_name']:40} | {cred['email']:35} | {cred['password']}")
    
    print("\n" + "="*80)
    print(f"✅ Database seeded successfully!")
    print(f"   Total Users: {users_count}")
    print(f"   Total Complaints: {complaints_count}")
    print("="*80 + "\n")
    
    close_db()


if __name__ == "__main__":
    try:
        seed_database()
    except Exception as e:
        print(f"\n❌ Error seeding database: {str(e)}")
        import traceback
        traceback.print_exc()
        close_db()
