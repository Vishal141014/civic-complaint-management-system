# Smart P-CRM: Civic Complaint Management System

A complete web platform for managing civic complaints with intelligent routing, ML-powered sentiment analysis, and role-based workflow management.

```
   _____ _____ __________ _____________
  / ___// ___// ____/ __ /_  __/ ____  /
  \__ \ \__ \/ __/ / /_/ // / / /_   /
 ___/ / ___/ /___/ _, _// / / __/   /
/____/ /____/_____/_/ |_//_/ /_/    /
                       P-CRM v1.0
```

---

## 🎯 Project Overview

**Smart P-CRM** is a civic complaint management platform that helps citizens report local issues (potholes, streetlights, water leaks, etc.) and enables government workers to resolve them efficiently.

### Key Features
✅ User registration & authentication with JWT  
✅ Complaint submission with ML sentiment analysis  
✅ Role-based workflow (citizen → admin → worker → approval)  
✅ File uploads (before/after photos)  
✅ Real-time complaint status tracking  
✅ Department-based admin dashboards  
✅ Mobile-friendly responsive design  

---

## 📁 Project Structure

```
pcrm_hackathon/
│
├── 📘 README.md (this file)
├── .gitignore
│
├── 🔧 backend/
│   ├── main.py                      # FastAPI application entry
│   ├── requirements.txt              # Python dependencies
│   ├── .env.example                 # Environment template
│   ├── seed_data.py                 # Database seeder
│   ├── test_api.py                  # API test suite
│   ├── debug_routes.py              # Route debugger
│   ├── docker-compose.yml           # Local MongoDB + backend
│   ├── Dockerfile                   # Backend container
│   ├── start.bat / start.sh         # Quick start scripts
│   │
│   ├── db/
│   │   └── connection.py            # MongoDB connection
│   │
│   ├── models/
│   │   ├── user.py                  # User schema
│   │   └── complaint.py             # Complaint schema
│   │
│   ├── routes/
│   │   ├── auth.py                  # Auth endpoints
│   │   ├── complaints.py            # Complaint endpoints
│   │   └── uploads.py               # File upload endpoints
│   │
│   ├── middleware/
│   │   └── auth_middleware.py       # JWT authentication
│   │
│   ├── uploads/
│   │   ├── before/                  # Before photos
│   │   └── after/                   # After photos
│   │
│   ├── README.md                    # Backend documentation
│   └── PROJECT_SUMMARY.md           # Technical architecture
│
├── 🤖 ml_services/
│   ├── main.py                      # ML service entry
│   ├── predict.py                   # Sentiment analysis
│   ├── requirements.txt             # ML dependencies
│   └── README.md                    # ML service docs
│
└── 🎨 frontend/
    ├── (React/Vue app - to be built)
    └── README.md                    # Frontend setup
```

---

## 🚀 Quick Start Guide

### Prerequisites
- **Python 3.9+**
- **MongoDB** (local or Atlas)
- **Node.js 16+** (for frontend)
- **Git**

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/pcrm_hackthon.git
cd pcrm_hackthon
```

### 2. Backend Setup (FastAPI)

#### Option A: Automatic (Windows)
```bash
cd backend
start.bat
```

#### Option B: Automatic (macOS/Linux)
```bash
cd backend
bash start.sh
```

#### Option C: Manual Setup
```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # or: venv\Scripts\activate (Windows)

# Install dependencies
cd backend
pip install -r requirements.txt

# Create .env file
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

# Seed database with test data
python seed_data.py

# Start server
python main.py
```

**Server runs at:** http://localhost:8000  
**API Docs:** http://localhost:8000/docs

### 3. Test Database
```bash
mongosh
use smart_pcrm
db.users.find().pretty()
db.complaints.find().pretty()
```

### 4. Test API
```bash
# Option A: Interactive Swagger UI
http://localhost:8000/docs

# Option B: Run test suite
cd backend
python test_api.py

# Option C: curl
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"citizen@example.com","password":"citizen123"}'
```

### 5. ML Service (Optional)
```bash
cd ml_services
pip install -r requirements.txt
python main.py
```

**Service runs at:** http://localhost:8001

### 6. Frontend (Coming Soon)
```bash
cd frontend
npm install
npm start
```

**Frontend runs at:** http://localhost:3000

---

## 🔐 Test Accounts

After running `python seed_data.py`, use these credentials:

| Role | Email | Password | Access |
|------|-------|----------|--------|
| 👤 Citizen | citizen@example.com | citizen123 | Own complaints |
| 🛡️ Admin | admin@example.com | admin123 | Department complaints |
| 👷 Worker | worker@example.com | worker123 | Assigned complaints |
| 👑 SuperAdmin | superadmin@example.com | superadmin123 | All complaints |

---

## 📚 API Endpoints

### Authentication (2 routes)
```
POST   /auth/register          Create new account
POST   /auth/login             Get JWT token
```

### Complaints (9 routes)
```
POST   /complaints/submit      Submit complaint with ML analysis
GET    /complaints             List (filtered by role)
GET    /complaints/{id}        Get specific complaint
PUT    /complaints/{id}/assign Assign to worker
PUT    /complaints/{id}/complete Mark as completed
PUT    /complaints/{id}/approve   Approve work
PUT    /complaints/{id}/reject    Reject work
POST   /complaints/{id}/reraise   Reraise with high urgency
```

### Files (2 routes)
```
POST   /uploads/photo          Upload before/after photo
GET    /uploads/{type}/{filename} Download photo
```

---

## 🔄 Complaint Workflow

```
1️⃣ CITIZEN SUBMITS
   └─> Complaint created (SUBMITTED)
       └─> ML analyze sentiment & urgency
           └─> Notify admin

2️⃣ ADMIN ASSIGNS
   └─> Select worker
       └─> Set deadline
           └─> Status: ASSIGNED

3️⃣ WORKER WORKS
   └─> Mark as IN_PROGRESS
       └─> Complete work with notes
           └─> Upload after photo
               └─> Status: COMPLETED

4️⃣ ADMIN REVIEWS
   ├─> ✅ APPROVE
   │   └─> Status: APPROVED (Done!)
   └─> ❌ REJECT
       └─> Status: REJECTED
           └─> Citizen can reraise with HIGH urgency
```

---

## 🛠️ Development

### Backend Tests
```bash
cd backend
python test_api.py
```

### Database Operations
```bash
# Connect to MongoDB
mongosh

# View all users
db.users.find()

# View complaints for citizen
db.complaints.find({citizen_id: ObjectId("...")})

# Reset database
python seed_data.py
```

### Debug Routes
```bash
cd backend
python debug_routes.py
```

### Docker (Local MongoDB + Backend)
```bash
cd backend
docker-compose up -d
# MongoDB at localhost:27017
# API at localhost:8000

# Seed database in Docker
docker-compose exec backend python seed_data.py
```

---

## 📦 Technology Stack

### Backend
- **Framework:** FastAPI
- **Database:** MongoDB
- **Authentication:** JWT (HS256)
- **ORM:** PyMongo
- **Password:** Bcrypt
- **API Documentation:** Swagger/OpenAPI

### ML Service
- **Framework:** FastAPI
- **NLP:** VADER, TextBlob, or similar
- **Task:** Sentiment analysis & urgency prediction

### Frontend (Planned)
- **Framework:** React or Vue.js
- **State:** Redux or Vuex
- **UI:** Tailwind CSS or Material UI
- **HTTP:** Axios

### DevOps
- **Containerization:** Docker
- **Orchestration:** Docker Compose
- **Deployment:** AWS/Heroku/GCP

---

## 📖 Documentation

| Document | Purpose |
|----------|---------|
| [backend/README.md](backend/README.md) | Backend API guide with curl examples |
| [backend/PROJECT_SUMMARY.md](backend/PROJECT_SUMMARY.md) | Technical architecture & file breakdown |
| [ml_services/README.md](ml_services/README.md) | ML service documentation |
| [frontend/README.md](frontend/README.md) | Frontend setup (coming soon) |

---

## 🔒 Security Checklist

- [ ] Change `JWT_SECRET` in `.env` (use strong random key)
- [ ] Update `MONGO_URI` to use MongoDB Atlas for production
- [ ] Set `DEBUG=False` in production
- [ ] Update CORS `allow_origins` with real frontend domain
- [ ] Enable HTTPS/SSL certificates
- [ ] Set up rate limiting
- [ ] Add request validation
- [ ] Use environment variables for all secrets
- [ ] Regular security audits

---

## 🐛 Troubleshooting

### Backend Issues

**MongoDB Connection Failed**
```
Solution: Ensure MongoDB is running
mongod (local) or check MongoDB Atlas connection string
```

**Dependencies Not Installing**
```
Solution: Use correct Python version (3.9+)
python --version
pip install --upgrade pip
```

**Port 8000 Already in Use**
```
Solution: Kill process or use different port
# Windows
netstat -ano | findstr :8000
taskkill /PID {PID} /F

# macOS/Linux
lsof -i :8000
kill -9 {PID}
```

**JWT Token Invalid**
```
Solution: Re-login to get fresh token
Tokens expire after 7 days
```

### API Issues

**405 Method Not Allowed**
```
Solution: Check HTTP method (GET/POST/PUT)
Verify endpoint in /docs
```

**422 Unprocessable Entity**
```
Solution: Check request body format
Validate JSON syntax
```

---

## 📈 Performance Optimization

- **Caching:** Redis for token blacklist (planned)
- **Database:** Add indexes on `citizen_id`, `assigned_to`
- **Pagination:** Implement limit/offset for large datasets
- **CDN:** CloudFront for static files
- **Compression:** gzip for API responses

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/new-feature`
3. Commit changes: `git commit -m "Add new feature"`
4. Push to branch: `git push origin feature/new-feature`
5. Create Pull Request

**Code Style:**
- Follow PEP 8 for Python
- Use type hints
- Write docstrings
- Add tests for new features

---

## 📝 Environment Variables

Required in `.env`:
```
MONGO_URI=mongodb://localhost:27017
JWT_SECRET=your_super_secret_key_here
JWT_ALGORITHM=HS256
ML_SERVICE_URL=http://localhost:8001
DEBUG=True
```

See [backend/.env.example](backend/.env.example) for full template

---

## 📞 Support & Contact

- **Issues:** Create GitHub issue
- **Discussions:** Start GitHub discussion
- **Email:** support@smartpcrm.local
- **Documentation:** Full API docs at http://localhost:8000/docs

---

## 📄 License

This project is licensed under the **MIT License** - see LICENSE file for details

---

## 🗓️ Project Status

| Component | Status | Version |
|-----------|--------|---------|
| Backend API | ✅ Complete | 1.0.0 |
| Database (MongoDB) | ✅ Complete | 1.0.0 |
| Authentication | ✅ Complete | 1.0.0 |
| ML Service | 🔄 In Progress | 0.5.0 |
| Frontend | 🚀 Planned | 1.0.0 |
| Deployment | 🚀 Planned | 1.0.0 |

---

## 🎓 Learning Resources

- [FastAPI Tutorial](https://fastapi.tiangolo.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT Authentication](https://jwt.io/)
- [REST API Best Practices](https://restfulapi.net/)
- [Docker Guide](https://docs.docker.com/)

---

## 🚀 Next Steps

1. **Backend:** Test all API endpoints ✅
2. **Database:** Verify MongoDB seeding ✅
3. **ML Service:** Deploy sentiment analysis
4. **Frontend:** Build React/Vue dashboard
5. **Testing:** Add comprehensive test suite
6. **Deployment:** Set up CI/CD pipeline
7. **Monitoring:** Add logging & analytics
8. **Documentation:** Update API docs

---

**Last Updated:** March 17, 2026  
**Version:** 1.0.0  
**Author:** Development Team  

---

<div align="center">

**[⬆ Back to Top](#smart-p-crm-civic-complaint-management-system)**

Made with ❤️ for better civic services

</div>
