from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from fastapi.responses import FileResponse
import os
import shutil
from pathlib import Path
from datetime import datetime, timezone

from middleware.auth_middleware import get_current_user

router = APIRouter(prefix="/uploads", tags=["uploads"])

UPLOAD_DIR = Path("uploads")
BEFORE_DIR = UPLOAD_DIR / "before"
AFTER_DIR = UPLOAD_DIR / "after"

# Create directories if they don't exist
BEFORE_DIR.mkdir(parents=True, exist_ok=True)
AFTER_DIR.mkdir(parents=True, exist_ok=True)

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}
MAX_FILE_SIZE = 5 * 1024 * 1024  # 5MB


def is_valid_image(filename: str) -> bool:
    """Check if file has valid image extension"""
    return Path(filename).suffix.lower() in ALLOWED_EXTENSIONS


@router.post("/photo")
async def upload_photo(
    file: UploadFile = File(...),
    photo_type: str = "before",
    current_user: dict = Depends(get_current_user)
):
    """Upload complaint photo (before or after)"""
    
    # Validate file
    if not is_valid_image(file.filename):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only image files are allowed (jpg, jpeg, png, gif, webp)"
        )
    
    # Determine directory
    if photo_type == "before":
        save_dir = BEFORE_DIR
    elif photo_type == "after":
        save_dir = AFTER_DIR
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="photo_type must be 'before' or 'after'"
        )
    
    # Generate filename with timestamp
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%d_%H%M%S")
    user_id = current_user["user_id"]
    file_extension = Path(file.filename).suffix.lower()
    filename = f"{user_id}_{timestamp}{file_extension}"
    file_path = save_dir / filename
    
    try:
        # Save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Return relative path for storage
        relative_path = f"/uploads/{photo_type}/{filename}"
        
        return {
            "filename": filename,
            "file_path": relative_path,
            "size": os.path.getsize(file_path),
            "message": "Photo uploaded successfully"
        }
    
    except Exception as e:
        if file_path.exists():
            file_path.unlink()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error uploading file: {str(e)}"
        )
    
    finally:
        file.file.close()


@router.get("/{photo_type}/{filename}")
async def get_photo(photo_type: str, filename: str):
    """Serve photo file"""
    
    if photo_type == "before":
        file_path = BEFORE_DIR / filename
    elif photo_type == "after":
        file_path = AFTER_DIR / filename
    else:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid photo type"
        )
    
    if not file_path.exists():
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Photo not found"
        )
    
    return FileResponse(file_path)
