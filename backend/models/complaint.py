from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum
from bson import ObjectId


class ComplaintUrgency(str, Enum):
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class ComplaintStatus(str, Enum):
    SUBMITTED = "submitted"
    ASSIGNED = "assigned"
    IN_PROGRESS = "in_progress"
    COMPLETED = "completed"
    APPROVED = "approved"
    REJECTED = "rejected"
    RERAISED = "reraised"


class ComplaintBase(BaseModel):
    text: str
    category: str
    urgency: ComplaintUrgency = ComplaintUrgency.MEDIUM


class ComplaintSubmit(ComplaintBase):
    before_photo: Optional[str] = None
    department: Optional[str] = None


class ComplaintAssign(BaseModel):
    worker_id: str
    deadline: datetime


class ComplaintComplete(BaseModel):
    work_notes: str
    after_photo: Optional[str] = None


class ComplaintReraise(BaseModel):
    reason: str
    new_photo: Optional[str] = None


class ComplaintReview(BaseModel):
    notes: Optional[str] = None


class Complaint(ComplaintBase):
    id: str = Field(alias="_id")
    citizen_id: str
    status: ComplaintStatus = ComplaintStatus.SUBMITTED
    sentiment: Optional[dict] = None  # From ML service
    before_photo: Optional[str] = None
    after_photo: Optional[str] = None
    assigned_to: Optional[str] = None
    worker_notes: Optional[List[str]] = []
    approval_notes: Optional[str] = None
    deadline: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    rejected_reason: Optional[str] = None

    class Config:
        populate_by_name = True


class ComplaintInDB(BaseModel):
    _id: ObjectId
    citizen_id: str
    text: str
    category: str
    urgency: str
    status: str = "submitted"
    sentiment: Optional[dict] = None
    before_photo: Optional[str] = None
    after_photo: Optional[str] = None
    assigned_to: Optional[str] = None
    worker_notes: Optional[List[str]] = []
    approval_notes: Optional[str] = None
    deadline: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime
    rejected_reason: Optional[str] = None
