from fastapi import APIRouter, HTTPException, status
from pydantic import EmailStr
from passlib.context import CryptContext
from datetime import datetime, timezone
from bson import ObjectId

from db.connection import get_db
from models.user import UserCreate, UserLogin, UserRole
from middleware.auth_middleware import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def hash_password(password: str) -> str:
    """Hash password using bcrypt"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Verify password against hash"""
    return pwd_context.verify(plain_password, hashed_password)


@router.post("/register")
async def register(user_data: UserCreate):
    """Register new user"""
    db = get_db()
    
    # Check if user already exists
    existing_user = db["users"].find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user document
    user_doc = {
        "name": user_data.name,
        "email": user_data.email,
        "phone": user_data.phone,
        "password_hash": hash_password(user_data.password),
        "role": user_data.role or UserRole.CITIZEN,
        "department": user_data.department,
        "is_active": True,
        "created_at": datetime.now(timezone.utc)
    }
    
    result = db["users"].insert_one(user_doc)
    user_id = str(result.inserted_id)
    
    # Create access token
    access_token = create_access_token(
        user_id=user_id,
        email=user_data.email,
        role=user_data.role or UserRole.CITIZEN
    )
    
    return {
        "id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "role": user_data.role or UserRole.CITIZEN,
        "access_token": access_token,
        "token_type": "bearer"
    }


@router.post("/login")
async def login(credentials: UserLogin):
    """Login user and return JWT token"""
    db = get_db()
    
    # Find user by email
    user = db["users"].find_one({"email": credentials.email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Verify password
    if not verify_password(credentials.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    # Create access token
    access_token = create_access_token(
        user_id=str(user["_id"]),
        email=user["email"],
        role=user["role"]
    )
    
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "role": user["role"],
        "access_token": access_token,
        "token_type": "bearer"
    }
