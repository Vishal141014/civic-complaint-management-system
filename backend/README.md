# Smart P-CRM Backend API

Complete FastAPI backend for a civic complaint management system with MongoDB, JWT authentication, and ML integration.

## 📋 Features

✅ **Authentication**
- User registration and login with JWT tokens
- Role-based access control (citizen, admin, worker, superadmin)

✅ **Complaint Management**
- Submit complaints with ML sentiment analysis
- Filter complaints by user role
- Assign complaints to workers
- Complete, approve, reject, and reraise complaints

✅ **File Uploads**
- Upload before/after complaint photos
- Serve static files from `/uploads/` directory

✅ **Database**
- MongoDB integration with pymongo
- Automatic connection on startup/shutdown

---

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.9+
- MongoDB running on localhost:27017
- Python ML Service running on localhost:8001 (optional)

### 2. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 3. Seed Database with Test Data

```bash
python seed_data.py
```

This creates:
- 4 test users (citizen, admin, worker, superadmin)
- 10 sample complaints

### 4. Start Backend Server

```bash
python main.py
```

The API will start at: **http://localhost:8000**
- 📚 Interactive Docs: http://localhost:8000/docs
- 🔧 ReDoc: http://localhost:8000/redoc

---

## 🧪 Testing All Routes

### Test Accounts

After seeding, use these credentials:

| Role | Email | Password |
|------|-------|----------|
| Citizen | citizen@example.com | citizen123 |
| Admin | admin@example.com | admin123 |
| Worker | worker@example.com | worker123 |
| SuperAdmin | superadmin@example.com | superadmin123 |

### Health Check

```bash
curl http://localhost:8000/health
```

**Response:**
```json
{"status": "healthy"}
```

---

## 🔐 Authentication Routes

### Register New User

```bash
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "9876543214",
    "password": "password123",
    "role": "citizen"
  }'
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Jane Doe",
  "email": "jane@example.com",
  "role": "citizen",
  "access_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

### Login

```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "citizen@example.com",
    "password": "citizen123"
  }'
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439010",
  "name": "John Citizen",
  "email": "citizen@example.com",
  "role": "citizen",
  "access_token": "eyJhbGc...",
  "token_type": "bearer"
}
```

**Save the token for subsequent requests:**
```bash
TOKEN="eyJhbGc..."
```

---

## 📝 Complaint Routes

All complaint routes require Authorization header:
```bash
-H "Authorization: Bearer $TOKEN"
```

### Submit Complaint

```bash
TOKEN="<your_token_here>"

curl -X POST http://localhost:8000/complaints/submit \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "text": "Large pothole on Main Street near bus stop",
    "category": "pothole",
    "urgency": "high",
    "before_photo": "/uploads/before/photo_12345.jpg"
  }'
```

**Response:**
```json
{
  "id": "507f1f77bcf86cd799439012",
  "citizen_id": "507f1f77bcf86cd799439010",
  "text": "Large pothole on Main Street near bus stop",
  "category": "pothole",
  "urgency": "high",
  "status": "submitted",
  "sentiment": {
    "score": 0.85,
    "label": "negative"
  },
  "before_photo": "/uploads/before/photo_12345.jpg",
  "created_at": "2026-03-17T10:30:00",
  "message": "Complaint submitted successfully"
}
```

### Get All Complaints (by Role)

```bash
TOKEN="<your_token_here>"

# Citizen - sees only their complaints
curl -X GET http://localhost:8000/complaints \
  -H "Authorization: Bearer $TOKEN"

# Admin - sees complaints in their department
# Worker - sees complaints assigned to them
# SuperAdmin - sees all complaints
```

**Response:**
```json
{
  "count": 5,
  "complaints": [
    {
      "_id": "507f1f77bcf86cd799439012",
      "citizen_id": "507f1f77bcf86cd799439010",
      "text": "Large pothole...",
      "category": "pothole",
      "urgency": "high",
      "status": "submitted",
      "created_at": "2026-03-17T10:30:00",
      ...
    }
  ]
}
```

### Get Specific Complaint

```bash
TOKEN="<your_token_here>"
COMPLAINT_ID="507f1f77bcf86cd799439012"

curl -X GET http://localhost:8000/complaints/$COMPLAINT_ID \
  -H "Authorization: Bearer $TOKEN"
```

### Assign Complaint to Worker

**Admin/SuperAdmin only**

```bash
ADMIN_TOKEN="<admin_token>"
COMPLAINT_ID="507f1f77bcf86cd799439012"
WORKER_ID="507f1f77bcf86cd799439013"

curl -X PUT http://localhost:8000/complaints/$COMPLAINT_ID/assign \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "worker_id": "'$WORKER_ID'",
    "deadline": "2026-03-24T17:00:00"
  }'
```

**Response:**
```json
{"message": "Complaint assigned successfully"}
```

### Complete Complaint (Worker)

**Worker assigned to complaint only**

```bash
WORKER_TOKEN="<worker_token>"
COMPLAINT_ID="507f1f77bcf86cd799439012"

curl -X PUT http://localhost:8000/complaints/$COMPLAINT_ID/complete \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $WORKER_TOKEN" \
  -d '{
    "work_notes": "Pothole filled and sealed successfully",
    "after_photo": "/uploads/after/photo_12346.jpg"
  }'
```

**Response:**
```json
{"message": "Complaint marked as completed"}
```

### Approve Complaint

**Admin/SuperAdmin only**

```bash
ADMIN_TOKEN="<admin_token>"
COMPLAINT_ID="507f1f77bcf86cd799439012"

curl -X PUT http://localhost:8000/complaints/$COMPLAINT_ID/approve \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "notes": "Work completed to standard"
  }'
```

**Response:**
```json
{"message": "Complaint approved"}
```

### Reject Complaint

**Admin/SuperAdmin only**

```bash
ADMIN_TOKEN="<admin_token>"
COMPLAINT_ID="507f1f77bcf86cd799439012"

curl -X PUT http://localhost:8000/complaints/$COMPLAINT_ID/reject \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -d '{
    "notes": "Does not meet quality standards - needs rework"
  }'
```

**Response:**
```json
{"message": "Complaint rejected"}
```

### Reraise Rejected Complaint

**Original citizen only**

```bash
CITIZEN_TOKEN="<citizen_token>"
COMPLAINT_ID="507f1f77bcf86cd799439012"

curl -X POST http://localhost:8000/complaints/$COMPLAINT_ID/reraise \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $CITIZEN_TOKEN" \
  -d '{
    "reason": "Issue still not resolved after worker completion",
    "new_photo": "/uploads/before/photo_12347.jpg"
  }'
```

**Response:**
```json
{"message": "Complaint reraised with HIGH urgency"}
```

---

## 📸 File Upload Routes

### Upload Photo

```bash
TOKEN="<your_token>"

curl -X POST http://localhost:8000/uploads/photo \
  -H "Authorization: Bearer $TOKEN" \
  -F "file=@/path/to/photo.jpg" \
  -F "photo_type=before"
```

**Photo type options:** `before` or `after`

**Response:**
```json
{
  "filename": "507f1f77bcf86cd799439010_20260317_103000.jpg",
  "file_path": "/uploads/before/507f1f77bcf86cd799439010_20260317_103000.jpg",
  "size": 245632,
  "message": "Photo uploaded successfully"
}
```

### Download Photo

```bash
curl -X GET http://localhost:8000/uploads/before/507f1f77bcf86cd799439010_20260317_103000.jpg \
  -O -J
```

---

## 🔌 Database Operations

### View Data in MongoDB

```bash
# Connect to MongoDB
mongosh

# Use smart_pcrm database
use smart_pcrm

# View users
db.users.find().pretty()

# View complaints
db.complaints.find().pretty()

# View specific user
db.users.findOne({email: "citizen@example.com"})

# View complaints for specific citizen
db.complaints.find({citizen_id: ObjectId("...")}).pretty()
```

### Reset Database

```bash
python seed_data.py
```

---

## 📊 API Documentation

### Interactive Swagger UI
```
http://localhost:8000/docs
```

Try requests directly from the browser!

### ReDoc Documentation
```
http://localhost:8000/redoc
```

---

## 🔧 Configuration

Edit `.env` file:

```env
# MongoDB connection
MONGO_URI=mongodb://localhost:27017

# JWT configuration
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_ALGORITHM=HS256

# ML Service (optional)
ML_SERVICE_URL=http://localhost:8001

# Debug mode
DEBUG=True
```

---

## 📁 Project Structure

```
backend/
├── main.py                 # FastAPI app setup
├── .env                    # Environment variables
├── requirements.txt        # Dependencies
├── seed_data.py           # Test data seeder
├── uploads/               # Photo storage
│   ├── before/           # Before photos
│   └── after/            # After photos
├── db/
│   └── connection.py      # MongoDB connection
├── models/
│   ├── user.py           # User schema
│   └── complaint.py       # Complaint schema
├── routes/
│   ├── auth.py           # Auth endpoints
│   ├── complaints.py      # Complaint endpoints
│   └── uploads.py        # File upload endpoints
└── middleware/
    └── auth_middleware.py # JWT verification
```

---

## 🔐 Role-Based Access Control

| Endpoint | Citizen | Admin | Worker | SuperAdmin |
|----------|---------|-------|--------|-----------|
| POST /auth/register | ✅ | ✅ | ✅ | ✅ |
| POST /auth/login | ✅ | ✅ | ✅ | ✅ |
| POST /complaints/submit | ✅ | ✅ | ✅ | ✅ |
| GET /complaints | Own only | All in dept | Assigned | All |
| GET /complaints/:id | Own only | All | Assigned | All |
| PUT /complaints/:id/assign | ❌ | ✅ | ❌ | ✅ |
| PUT /complaints/:id/complete | ❌ | ❌ | Assigned | ❌ |
| PUT /complaints/:id/approve | ❌ | ✅ | ❌ | ✅ |
| PUT /complaints/:id/reject | ❌ | ✅ | ❌ | ✅ |
| POST /complaints/:id/reraise | Own only | ❌ | ❌ | ❌ |
| POST /uploads/photo | ✅ | ✅ | ✅ | ✅ |

---

## 🐛 Troubleshooting

### MongoDB Connection Failed
```
❌ Error: Failed to connect to MongoDB
```
- Ensure MongoDB is running: `mongod` or `MongoDB server` service
- Check MONGO_URI in `.env`
- Verify connection on port 27017

### JWT Token Invalid
```
❌ Error: Invalid token
```
- Ensure token is passed in header: `Authorization: Bearer <token>`
- Check token hasn't expired (valid for 7 days)
- Regenerate token by logging in again

### File Upload Failed
```
❌ Error: Only image files are allowed
```
- Use only: .jpg, .jpeg, .png, .gif, .webp
- Keep file size under 5MB
- Check `uploads/` directory has write permissions

### ML Service Not Available
- Complaints can still be submitted without ML predictions
- Sentiment analysis will be `None` if service is unavailable

---

## 📚 Example: Full Complaint Workflow

### 1. Citizen Registers and Submits Complaint

```bash
# Register
curl -X POST http://localhost:8000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9999999999",
    "password": "pass123"
  }'

# Save token from response
TOKEN="eyJhbGc..."

# Submit complaint
curl -X POST http://localhost:8000/complaints/submit \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Pothole near Main Street",
    "category": "pothole",
    "urgency": "high"
  }'

# Save complaint ID: COMPLAINT_ID="507f..."
```

### 2. Admin Assigns to Worker

```bash
ADMIN_TOKEN="<admin_token>"
COMPLAINT_ID="507f..."
WORKER_ID="507f..."

curl -X PUT http://localhost:8000/complaints/$COMPLAINT_ID/assign \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "worker_id": "'$WORKER_ID'",
    "deadline": "2026-03-24T17:00:00"
  }'
```

### 3. Worker Completes Complaint

```bash
WORKER_TOKEN="<worker_token>"
COMPLAINT_ID="507f..."

curl -X PUT http://localhost:8000/complaints/$COMPLAINT_ID/complete \
  -H "Authorization: Bearer $WORKER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "work_notes": "Pothole fixed successfully"
  }'
```

### 4. Admin Approves

```bash
ADMIN_TOKEN="<admin_token>"
COMPLAINT_ID="507f..."

curl -X PUT http://localhost:8000/complaints/$COMPLAINT_ID/approve \
  -H "Authorization: Bearer $ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{}'
```

---

## 🎯 Next Steps

- [ ] Set up MongoDB
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Seed database: `python seed_data.py`
- [ ] Start server: `python main.py`
- [ ] Test routes in Swagger UI: http://localhost:8000/docs
- [ ] Set up frontend at http://localhost:3000
- [ ] Configure ML service at localhost:8001

---

## 📝 License

MIT License - see LICENSE file for details

