from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime
from enum import Enum
from bson import ObjectId


class UserRole(str, Enum):
    CITIZEN = "citizen"
    ADMIN = "admin"
    WORKER = "worker"
    SUPERADMIN = "superadmin"


class UserBase(BaseModel):
    name: str
    phone: str
    email: EmailStr
    role: UserRole = UserRole.CITIZEN
    department: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class User(UserBase):
    id: str = Field(alias="_id")
    password_hash: str
    created_at: datetime
    is_active: bool = True

    class Config:
        populate_by_name = True


class UserInDB(BaseModel):
    _id: ObjectId
    name: str
    phone: str
    email: str
    password_hash: str
    role: str
    department: Optional[str] = None
    created_at: datetime
    is_active: bool = True
