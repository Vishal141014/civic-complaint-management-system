from fastapi import APIRouter, HTTPException, status, Depends
from datetime import datetime, timezone
from bson import ObjectId
import requests
import os
from dotenv import load_dotenv

from db.connection import get_db
from models.complaint import (
    Complaint, ComplaintSubmit, ComplaintAssign, 
    ComplaintComplete, ComplaintReraise, ComplaintReview,
    ComplaintStatus, ComplaintUrgency
)
from middleware.auth_middleware import get_current_user, role_required

load_dotenv()

router = APIRouter(prefix="/complaints", tags=["complaints"])
ML_SERVICE_URL = os.getenv("ML_SERVICE_URL", "http://localhost:8001")


def convert_to_response(complaint_doc):
    """Convert MongoDB document to response model"""
    complaint_doc["_id"] = str(complaint_doc["_id"])
    return complaint_doc


def call_ml_service(complaint_text: str):
    """Call ML service to predict sentiment and urgency"""
    try:
        response = requests.post(
            f"{ML_SERVICE_URL}/predict",
            json={"text": complaint_text},
            timeout=5
        )
        if response.status_code == 200:
            return response.json()
    except Exception as e:
        print(f"ML Service error: {str(e)}")
    
    return {"sentiment": None, "predicted_urgency": None}


@router.post("/submit")
async def submit_complaint(
    complaint_data: ComplaintSubmit,
    current_user: dict = Depends(get_current_user)
):
    """Submit new complaint and get ML predictions"""
    db = get_db()
    
    # Call ML service for predictions
    ml_result = call_ml_service(complaint_data.text)
    
    # Create complaint document
    complaint_doc = {
        "citizen_id": current_user["user_id"],
        "text": complaint_data.text,
        "category": complaint_data.category,
        "urgency": complaint_data.urgency,
        "status": ComplaintStatus.SUBMITTED,
        "sentiment": ml_result.get("sentiment"),
        "before_photo": complaint_data.before_photo,
        "after_photo": None,
        "assigned_to": None,
        "worker_notes": [],
        "approval_notes": None,
        "deadline": None,
        "created_at": datetime.now(timezone.utc),
        "updated_at": datetime.now(timezone.utc),
        "rejected_reason": None
    }
    
    result = db["complaints"].insert_one(complaint_doc)
    complaint_doc["_id"] = result.inserted_id
    
    return {
        "id": str(result.inserted_id),
        "citizen_id": current_user["user_id"],
        "text": complaint_data.text,
        "category": complaint_data.category,
        "urgency": complaint_data.urgency,
        "status": ComplaintStatus.SUBMITTED,
        "sentiment": ml_result.get("sentiment"),
        "before_photo": complaint_data.before_photo,
        "created_at": complaint_doc["created_at"],
        "message": "Complaint submitted successfully"
    }


@router.get("")
async def get_complaints(current_user: dict = Depends(get_current_user)):
    """Get complaints based on user role"""
    db = get_db()
    role = current_user["role"]
    user_id = current_user["user_id"]
    
    # Build query based on role
    if role == "citizen":
        # Citizens see only their own complaints
        query = {"citizen_id": user_id}
    elif role == "worker":
        # Workers see only complaints assigned to them
        query = {"assigned_to": user_id}
    elif role == "admin":
        # Admins see complaints in their department
        admin = db["users"].find_one({"_id": ObjectId(user_id)})
        if admin and admin.get("department"):
            # This would require a department field in complaints
            # For now, admins see some complaints (can be enhanced)
            query = {}
        else:
            query = {}
    elif role == "superadmin":
        # Superadmins see all complaints
        query = {}
    else:
        query = {}
    
    complaints = list(db["complaints"].find(query).limit(100))
    
    # Convert ObjectId to string
    for complaint in complaints:
        complaint["_id"] = str(complaint["_id"])
        if isinstance(complaint.get("assigned_to"), ObjectId):
            complaint["assigned_to"] = str(complaint["assigned_to"])
        if isinstance(complaint.get("citizen_id"), ObjectId):
            complaint["citizen_id"] = str(complaint["citizen_id"])
    
    return {
        "count": len(complaints),
        "complaints": complaints
    }


@router.get("/{complaint_id}")
async def get_complaint(
    complaint_id: str,
    current_user: dict = Depends(get_current_user)
):
    """Get specific complaint with role-based access check"""
    db = get_db()
    
    try:
        complaint = db["complaints"].find_one({"_id": ObjectId(complaint_id)})
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid complaint ID"
        )
    
    if not complaint:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Complaint not found"
        )
    
    # Check access based on role
    role = current_user["role"]
    user_id = current_user["user_id"]
    
    if role == "citizen" and str(complaint["citizen_id"]) != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Cannot access other user's complaints"
        )
    elif role == "worker" and str(complaint.get("assigned_to")) != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Complaint not assigned to you"
        )
    
    complaint["_id"] = str(complaint["_id"])
    return complaint


@router.put("/{complaint_id}/assign")
async def assign_complaint(
    complaint_id: str,
    assign_data: ComplaintAssign,
    current_user: dict = Depends(role_required("admin", "superadmin"))
):
    """Assign complaint to worker"""
    db = get_db()
    
    try:
        # Check worker exists
        worker = db["users"].find_one({"_id": ObjectId(assign_data.worker_id)})
        if not worker or worker["role"] != "worker":
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid worker ID"
            )
        
        # Update complaint
        result = db["complaints"].update_one(
            {"_id": ObjectId(complaint_id)},
            {
                "$set": {
                    "assigned_to": ObjectId(assign_data.worker_id),
                    "deadline": assign_data.deadline,
                    "status": ComplaintStatus.ASSIGNED,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        if result.matched_count == 0:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Complaint not found"
            )
        
        return {"message": "Complaint assigned successfully"}
    
    except HTTPException:
        raise
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid complaint ID"
        )


@router.put("/{complaint_id}/complete")
async def complete_complaint(
    complaint_id: str,
    complete_data: ComplaintComplete,
    current_user: dict = Depends(role_required("worker"))
):
    """Mark complaint as completed by worker"""
    db = get_db()
    
    try:
        # Check if complaint is assigned to current worker
        complaint = db["complaints"].find_one({"_id": ObjectId(complaint_id)})
        
        if not complaint:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Complaint not found"
            )
        
        if str(complaint.get("assigned_to")) != current_user["user_id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Complaint not assigned to you"
            )
        
        # Update complaint
        db["complaints"].update_one(
            {"_id": ObjectId(complaint_id)},
            {
                "$set": {
                    "status": ComplaintStatus.COMPLETED,
                    "after_photo": complete_data.after_photo,
                    "worker_notes": [complete_data.work_notes],
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return {"message": "Complaint marked as completed"}
    
    except HTTPException:
        raise
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid complaint ID"
        )


@router.put("/{complaint_id}/approve")
async def approve_complaint(
    complaint_id: str,
    review: ComplaintReview = None,
    current_user: dict = Depends(role_required("admin", "superadmin"))
):
    """Approve completed complaint"""
    db = get_db()
    
    try:
        complaint = db["complaints"].find_one({"_id": ObjectId(complaint_id)})
        
        if not complaint:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Complaint not found"
            )
        
        if complaint["status"] != ComplaintStatus.COMPLETED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only completed complaints can be approved"
            )
        
        # Update complaint
        db["complaints"].update_one(
            {"_id": ObjectId(complaint_id)},
            {
                "$set": {
                    "status": ComplaintStatus.APPROVED,
                    "approval_notes": review.notes if review else None,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return {"message": "Complaint approved"}
    
    except HTTPException:
        raise
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid complaint ID"
        )


@router.put("/{complaint_id}/reject")
async def reject_complaint(
    complaint_id: str,
    review: ComplaintReview,
    current_user: dict = Depends(role_required("admin", "superadmin"))
):
    """Reject complaint"""
    db = get_db()
    
    try:
        complaint = db["complaints"].find_one({"_id": ObjectId(complaint_id)})
        
        if not complaint:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Complaint not found"
            )
        
        # Update complaint
        db["complaints"].update_one(
            {"_id": ObjectId(complaint_id)},
            {
                "$set": {
                    "status": ComplaintStatus.REJECTED,
                    "rejected_reason": review.notes,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return {"message": "Complaint rejected"}
    
    except HTTPException:
        raise
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid complaint ID"
        )


@router.post("/{complaint_id}/reraise")
async def reraise_complaint(
    complaint_id: str,
    reraise_data: ComplaintReraise,
    current_user: dict = Depends(role_required("citizen"))
):
    """Reraise rejected complaint with new photo"""
    db = get_db()
    
    try:
        complaint = db["complaints"].find_one({"_id": ObjectId(complaint_id)})
        
        if not complaint:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Complaint not found"
            )
        
        if str(complaint["citizen_id"]) != current_user["user_id"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Cannot reraise other user's complaints"
            )
        
        if complaint["status"] != ComplaintStatus.REJECTED:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only rejected complaints can be reraised"
            )
        
        # Update complaint with HIGH urgency
        db["complaints"].update_one(
            {"_id": ObjectId(complaint_id)},
            {
                "$set": {
                    "status": ComplaintStatus.RERAISED,
                    "urgency": ComplaintUrgency.HIGH,
                    "before_photo": reraise_data.new_photo or complaint.get("before_photo"),
                    "rejected_reason": None,
                    "updated_at": datetime.utcnow()
                }
            }
        )
        
        return {"message": "Complaint reraised with HIGH urgency"}
    
    except HTTPException:
        raise
    except:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid complaint ID"
        )
