# Smart P-CRM Backend - Complete Project Guide

## 📁 Project Structure

```
backend/
├── main.py                         # FastAPI application entry point
├── seed_data.py                    # Database seed with test data
├── test_api.py                     # Comprehensive API testing script
├── requirements.txt                # Python dependencies
├── .env                            # Environment configuration (create your own)
├── Dockerfile                      # Docker container configuration
├── docker-compose.yml              # Docker Compose for MongoDB + Backend
├── start.bat                       # Quick start script for Windows
├── start.sh                        # Quick start script for macOS/Linux
├── README.md                       # Complete documentation
│
├── db/
│   └── connection.py               # MongoDB connection management
│
├── models/
│   ├── user.py                     # User Pydantic schema
│   └── complaint.py                # Complaint Pydantic schema
│
├── routes/
│   ├── auth.py                     # Authentication routes (register, login)
│   ├── complaints.py               # Complaint management routes
│   └── uploads.py                  # File upload routes
│
├── middleware/
│   └── auth_middleware.py          # JWT token verification & role checking
│
└── uploads/                        # File storage directory
    ├── before/                     # Before photos
    └── after/                      # After photos
```

## 📋 File Descriptions

### Core Application Files

#### `main.py` (180 lines)
- FastAPI application initialization
- CORS middleware for frontend (localhost:3000, 3001)
- Static file mounting for `/uploads/`
- MongoDB connection lifecycle management
- Health check and root endpoints

**Key Functions:**
- `lifespan()` - Handles startup and shutdown events
- Routes included: auth, complaints, uploads

#### `requirements.txt`
Python dependencies:
- fastapi==0.104.1
- uvicorn==0.24.0
- pymongo==4.6.0
- pydantic==2.5.0
- pyjwt==2.8.1
- passlib==1.7.4
- python-dotenv==1.0.0
- requests==2.31.0

#### `.env`
Environment configuration:
```
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_ALGORITHM=HS256
DEBUG=True
ML_SERVICE_URL=http://localhost:8001
```

### Database

#### `db/connection.py` (50 lines)
MongoDB connection management
- `connect_db()` - Establish connection
- `close_db()` - Close connection
- `get_db()` - Get database instance
- Uses MONGO_URI from .env

### Models

#### `models/user.py` (60 lines)
User Pydantic schemas:
- `UserRole` enum: citizen, admin, worker, superadmin
- `UserCreate` - For registration (includes password)
- `UserLogin` - For login
- `User` - Response schema
- Fields: name, phone, email, password_hash, role, department, created_at, is_active

#### `models/complaint.py` (95 lines)
Complaint Pydantic schemas:
- `ComplaintCategory` enum: pothole, streetlight, garbage, water_leak, traffic_signal, public_amenity, other
- `ComplaintUrgency` enum: low, medium, high, critical
- `ComplaintStatus` enum: submitted, assigned, in_progress, completed, approved, rejected, reraised
- `ComplaintSubmit` - For submission
- `ComplaintAssign` - For assignment
- `ComplaintComplete` - For completion
- `ComplaintReview` - For approval/rejection
- `ComplaintReraise` - For re-raising
- Fields: citizen_id, text, category, urgency, status, sentiment, photos, assigned_to, notes, deadline, etc.

### Middleware

#### `middleware/auth_middleware.py` (85 lines)
JWT authentication and authorization
- `create_access_token()` - Generate JWT tokens
- `verify_token()` - Validate JWT tokens
- `get_current_user()` - Dependency to get authenticated user
- `role_required()` - Decorator for role-based access control
- Token expiry: 7 days
- Algorithm: HS256

### Routes

#### `routes/auth.py` (120 lines)
Authentication endpoints:
- `POST /auth/register` - Create new user account
- `POST /auth/login` - Authenticate and get JWT token
- Password hashing with bcrypt
- Checks for existing emails
- Returns access_token and user info

#### `routes/complaints.py` (320 lines)
Complaint management endpoints:

**Create:**
- `POST /complaints/submit`
  - Requires citizen/admin/worker/superadmin
  - Calls ML service for sentiment analysis
  - Returns complaint with ML predictions

**Read:**
- `GET /complaints`
  - Citizen: only own complaints
  - Admin: all in their department
  - Worker: only assigned to them
  - SuperAdmin: all
- `GET /complaints/{id}`
  - Role-based access check

**Update:**
- `PUT /complaints/{id}/assign`
  - Admin/SuperAdmin only
  - Assign to worker with deadline
- `PUT /complaints/{id}/complete`
  - Worker only, must be assigned
  - Add after_photo and work_notes
- `PUT /complaints/{id}/approve`
  - Admin/SuperAdmin only
  - Requires completed status
- `PUT /complaints/{id}/reject`
  - Admin/SuperAdmin only
  - Add rejection reason
- `POST /complaints/{id}/reraise`
  - Citizen only, must be rejected
  - Upgrades urgency to HIGH

#### `routes/uploads.py` (100 lines)
File upload endpoints:
- `POST /uploads/photo`
  - Saves to /uploads/before/ or /uploads/after/
  - Validates image format (jpg, png, gif, webp)
  - Max file size: 5MB
  - Returns file path for storage
- `GET /uploads/{type}/{filename}`
  - Serves uploaded photos
  - Supports streaming

### Utility Scripts

#### `seed_data.py` (150 lines)
Database seeding script:
- Creates 4 test users (one of each role)
- Creates 10 sample complaints
- Generates realistic test data
- Hash passwords with bcrypt
- Run: `python seed_data.py`

#### `test_api.py` (450 lines)
Comprehensive API testing script:
- Tests all routes
- Authentication flow
- Complaint lifecycle
- Role-based access
- Security checks
- Colored output for readability
- Run: `python test_api.py`

### Configuration Files

#### `Dockerfile`
Docker container for backend:
- Python 3.11-slim base
- Installs dependencies
- Exposes port 8000
- Health check enabled

#### `docker-compose.yml`
Full stack setup:
- MongoDB service on port 27017
- FastAPI backend on port 8000
- Volume mounts for persistence
- Environment variables
- Health checks

#### `start.bat` (Windows)
Automated startup script:
- Checks Python installation
- Verifies MongoDB running
- Creates virtual environment
- Installs dependencies
- Seeds database
- Starts server
- Usage: Simply run `start.bat`

#### `start.sh` (macOS/Linux)
Automated startup script for Unix systems:
- Same functionality as start.bat
- Bash syntax
- Usage: `bash start.sh` or `./start.sh`

#### `README.md` (600+ lines)
Complete documentation:
- Feature overview
- Quick start guide
- All API endpoints with examples
- Authentication flows
- Role-based access matrix
- Testing instructions
- Database operations
- Configuration guide
- Troubleshooting

---

## 🚀 Quick Start (Fastest Way)

### Windows:
```bash
# 1. Ensure MongoDB is running
# 2. Double-click: start.bat
# Done! Server starts at http://localhost:8000
```

### macOS/Linux:
```bash
# 1. Ensure MongoDB is running
# 2. Run: bash start.sh
# Done! Server starts at http://localhost:8000
```

### Docker (with MongoDB included):
```bash
cd backend
docker-compose up -d
# Wait for services to start
docker-compose exec backend python seed_data.py
```

---

## 🔑 Test Credentials (After Seeding)

| Role | Email | Password |
|------|-------|----------|
| Citizen | citizen@example.com | citizen123 |
| Admin | admin@example.com | admin123 |
| Worker | worker@example.com | worker123 |
| SuperAdmin | superadmin@example.com | superadmin123 |

---

## 📊 API Endpoints Summary

### Authentication (2 endpoints)
- `POST /auth/register` - Create account
- `POST /auth/login` - Get JWT token

### Complaints (9 endpoints)
- `POST /complaints/submit` - Create complaint
- `GET /complaints` - List by role
- `GET /complaints/{id}` - Get specific
- `PUT /complaints/{id}/assign` - Assign to worker
- `PUT /complaints/{id}/complete` - Mark completed
- `PUT /complaints/{id}/approve` - Approve work
- `PUT /complaints/{id}/reject` - Reject work
- `POST /complaints/{id}/reraise` - Re-raise rejected

### Files (2 endpoints)
- `POST /uploads/photo` - Upload image
- `GET /uploads/{type}/{filename}` - Download image

**Total: 13 endpoints**

---

## 🔐 Security Features

1. **JWT Authentication**
   - HS256 algorithm
   - 7-day token expiry
   - Bearer token validation

2. **Role-Based Access Control**
   - 4 user roles with different permissions
   - Decorator-based enforcement
   - Field-level access in complaints

3. **Password Security**
   - Bcrypt hashing
   - Never stored in plain text
   - Verified on login

4. **CORS Protection**
   - Limited to localhost:3000, 3001
   - Configurable origins

5. **Input Validation**
   - Pydantic schemas for all inputs
   - Email validation
   - File type checking

---

## 🔄 Complaint Workflow

1. **Citizen submits** → Status: SUBMITTED
2. **Admin assigns** → Status: ASSIGNED (to worker)
3. **Worker completes** → Status: COMPLETED (with photos/notes)
4. **Admin reviews** → Status: APPROVED or REJECTED
5. **If rejected** → Citizen can RERAISE (upgrade to HIGH)

---

## 📈 ML Service Integration

Complaints can receive sentiment analysis from ML service:
- Endpoint: `http://localhost:8001/predict`
- Optional - works without it
- Sentiment score and label included in response

---

## 🛠️ Development

### Run Tests
```bash
python test_api.py
```

### Seed Fresh Database
```bash
python seed_data.py
```

### Interactive API Docs
```
http://localhost:8000/docs
```

### Database Management
```bash
# Connect to MongoDB
mongosh

# Use database
use smart_pcrm

# View collections
db.users.find()
db.complaints.find()
```

---

## 📚 Documentation Files

1. **README.md** - User-facing documentation with all examples
2. **PROJECT_SUMMARY.md** - This file - technical overview
3. **API Endpoints in Code** - Docstrings in route files
4. **Swagger UI** - Interactive at `/docs`

---

## ✅ Verification Checklist

- [ ] MongoDB is running on port 27017
- [ ] Python 3.9+ is installed
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] Database seeded: `python seed_data.py`
- [ ] Server running: `python main.py`
- [ ] Health check passes: `curl http://localhost:8000/health`
- [ ] API docs work: http://localhost:8000/docs
- [ ] Can login with test accounts
- [ ] Can submit complaint
- [ ] Can assign/complete/approve workflow

---

## 🎯 Next Steps

1. **Frontend Integration**
   - Connect React/Vue frontend to localhost:8000
   - Use tokens from /auth/login in Authorization header

2. **ML Service Setup**
   - Deploy sentiment analysis service
   - Available at localhost:8001/predict
   - Optional - system works without it

3. **Production Deployment**
   - Change JWT_SECRET in .env
   - Use production MongoDB Atlas
   - Update CORS origins
   - Set DEBUG=False

4. **Database**
   - Set up MongoDB Atlas for production
   - Use connection string in MONGO_URI
   - Enable authentication

---

## 📞 Support

All endpoints documented in:
- Interactive Swagger: http://localhost:8000/docs
- README.md for detailed examples
- Code docstrings for implementation details

