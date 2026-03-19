from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os
from pathlib import Path

from db.connection import connect_db, close_db
from routes import auth, complaints, uploads

# Create uploads directories
uploads_dir = Path("uploads")
uploads_dir.mkdir(exist_ok=True)
(uploads_dir / "before").mkdir(exist_ok=True)
(uploads_dir / "after").mkdir(exist_ok=True)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle startup and shutdown events"""
    # Startup
    print("\n" + "="*50)
    print("🚀 Starting Smart P-CRM Backend")
    print("="*50)
    connect_db()
    yield
    # Shutdown
    print("\n" + "="*50)
    print("🛑 Shutting down Smart P-CRM Backend")
    print("="*50)
    close_db()


# Create FastAPI app
app = FastAPI(
    title="Smart P-CRM API",
    description="Civic Complaint Management System",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware - MUST be added BEFORE routes
# Allow localhost:3000 for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3001",
        "http://localhost:8000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:8000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=[
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "Access-Control-Request-Method",
        "Access-Control-Request-Headers",
    ],
    max_age=3600,
)

# Include routes
# Note: Include uploads router BEFORE mounting static files
# The router handles both POST (upload) and GET (download) for /uploads/photo
app.include_router(auth.router)
app.include_router(complaints.router)
app.include_router(uploads.router)

# Optional: Mount static files to /static/ for direct browser access
# This is not needed for the API since routes serve files
# app.mount("/static", StaticFiles(directory="uploads"), name="static")


@app.get("/")
async def root():
    """API health check"""
    return {
        "name": "Smart P-CRM API",
        "status": "running",
        "version": "1.0.0",
        "database": "MongoDB"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy"}


if __name__ == "__main__":
    import uvicorn
    
    print("\n" + "="*50)
    print("Smart P-CRM Backend Server")
    print("="*50)
    print("📍 API URL: http://localhost:8000")
    print("📚 Docs: http://localhost:8000/docs")
    print("="*50 + "\n")
    
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )
