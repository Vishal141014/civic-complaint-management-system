from fastapi import APIRouter, HTTPException, status, Header, Depends
from pydantic import EmailStr
from passlib.context import CryptContext
from datetime import datetime, timezone
from bson import ObjectId

from db.connection import get_db
from models.user import UserCreate, UserLogin, UserRole
from middleware.auth_middleware import create_access_token, verify_token

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
    """Register new user - only citizen and worker roles allowed"""
    db = get_db()
    
    # Only allow citizen and worker roles
    if user_data.role not in [UserRole.CITIZEN, UserRole.WORKER]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only citizen and worker roles can self-register"
        )
    
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
    
    return {
        "success": True,
        "message": "Registration successful",
        "id": user_id,
        "name": user_data.name,
        "email": user_data.email,
        "phone": user_data.phone,
        "role": user_data.role or UserRole.CITIZEN,
        "department": user_data.department,
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
        "phone": user.get("phone", ""),
        "role": user["role"],
        "department": user.get("department"),
        "access_token": access_token,
        "token_type": "bearer",
        "message": "Login successful"
    }


@router.get("/me")
async def get_current_user(current_user: dict = Depends(verify_token)):
    """Get current user info from token"""
    db = get_db()
    
    # Find user by ID from token
    user = db["users"].find_one({"_id": ObjectId(current_user["user_id"])})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found"
        )
    
    return {
        "user": {
            "id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "phone": user.get("phone", ""),
            "role": user["role"],
            "department": user.get("department"),
        },
        "role": user["role"]
    }
