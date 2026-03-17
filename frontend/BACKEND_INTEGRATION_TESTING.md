# Backend Integration Testing Guide

## ✅ What's Been Fixed

### 1. **Text Color Visibility** 🎨
- Updated Navbar navigation links from `text-navy-300` (dark) to `text-white/80` (visible)
- Added text utility classes in globals.css:
  - `.text-light` → white text
  - `.text-light-muted` → 80% opacity white
  - `.text-light-secondary` → 60% opacity white
- Updated placeholder colors for better contrast
- All dark glassmorphic cards now have proper text contrast

### 2. **Backend Integration** 🔌
- Created API service files with axios setup
- Updated Login page to connect to backend auth endpoint
- Created `.env` file with `REACT_APP_API_URL=http://localhost:8000`
- Added `loginWithToken()` method to AuthContext for backend token storage
- Fixed Authentication context to work with backend responses

---

## 🚀 Testing the Backend Connection

### Step 1: Start Backend Server
```bash
cd backend
python main.py
# OR
./start.sh  # Linux/Mac
./start.bat # Windows
```

Backend will run on: **http://localhost:8000**

### Step 2: Verify Backend is Running
```bash
curl http://localhost:8000/health
# Expected: {"status": "healthy"}
```

### Step 3: Test Login Endpoint
```bash
curl -X POST http://localhost:8000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "citizen@example.com",
    "password": "password123"
  }'
```

**Expected Response:**
```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "John Citizen",
  "email": "citizen@example.com",
  "role": "citizen",
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "bearer"
}
```

---

## 🔐 How Login Works Now

### Frontend Flow
```javascript
1. User enters email + password on /login
2. submitHandler calls loginRequest(email, password)
3. axios POST to http://localhost:8000/auth/login
4. Backend validates credentials + returns JWT token
5. Frontend stores token + user data in localStorage via AuthContext
6. Frontend redirects to role-specific dashboard
```

### Authentication Header
All API requests now include:
```
Authorization: Bearer <access_token>
```

---

## 📋 Test User Credentials

The backend should have seed data. Try these roles:

### Citizen
- Email: `citizen@example.com`
- Password: `password123`
- Dashboard: `/citizen/my-complaints`

### Department Admin
- Email: `admin@example.com`
- Password: `password123`
- Dashboard: `/admin/dashboard`

### Field Worker
- Email: `worker@example.com`
- Password: `password123`
- Dashboard: `/worker/tasks`

### Super Admin
- Email: `superadmin@example.com`
- Password: `password123`
- Dashboard: `/superadmin/dashboard`

---

## 🔗 API Endpoints Ready for Integration

The frontend already has API service files set up. Here's what's available:

### Authentication (`api/auth.js`)
```javascript
loginRequest(email, password)     // ✅ Implemented
```

### Complaints (`api/complaints.js`)
- `submitComplaint(data, token)`
- `getComplaints(filters, token)`
- `getComplaintById(id, token)`
- `assignComplaint(id, data, token)`
- `approveComplaint(id, token)`
- `rejectComplaint(id, token)`
- `reraiseComplaint(id, data, token)`

All these functions are ready to be used in your pages!

---

## 🧪 Manual Testing Checklist

### Test Login Flow
- [ ] Start backend on http://localhost:8000
- [ ] Open frontend on http://localhost:3000
- [ ] Enter valid email/password from seed data
- [ ] Click "Login"
- [ ] Verify redirects to correct dashboard
- [ ] Check localStorage for token: `localStorage.getItem('auth')`
- [ ] Logout and verify token is cleared

### Test Text Colors
- [ ] Login page text is visible on dark background
- [ ] Navbar links are readable (white/80% opacity)
- [ ] Submit buttons have good contrast
- [ ] Error messages are readable

### Test Role-Based Access
- [ ] Login as Citizen → see citizen dashboard
- [ ] Try accessing `/admin/dashboard` as citizen → redirect to /unauthorized
- [ ] Login as Admin → see admin dashboard
- [ ] Navbar shows role-specific links

---

## ⚙️ Environment Configuration

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

### Backend (.env)
```
DATABASE_URL=mongodb://localhost:27017/civic-complaints
JWT_SECRET=your-secret-key
ML_SERVICE_URL=http://localhost:8001
```

---

## 🐛 Troubleshooting

### "Connection refused" error
**Problem**: Backend not running
**Solution**: Start backend with `python main.py` (ensure MongoDB is also running)

### "Invalid email or password"
**Problem**: Wrong credentials or no seed data
**Solution**: 
1. Check backend seed data in `backend/seed_data.py`
2. Run seed data: `python backend/seed_data.py`
3. Verify MongoDB has users collection

### Text not visible on login page
**Problem**: Old cache from previous version
**Solution**: 
1. Delete node_modules: `rm -rf node_modules` (or DELETE folder on Windows)
2. Delete .env.local if exists
3. Run `npm install` again
4. Clear browser cache (Ctrl+Shift+Delete)

### Token not persisting after refresh
**Problem**: localStorage not accessible
**Solution**: Check browser console for CORS or security errors

---

## 📊 Next Steps for Full Integration

1. **Update MyComplaints.jsx** → Replace mock data with `getComplaints()` API call
2. **Update AdminDashboard.jsx** → Fetch real complaints with filters
3. **Update WorkerTasks.jsx** → Only show tasks assigned to current worker
4. **Update SubmitComplaint.jsx** → Call `submitComplaint()` API
5. **Update ReviewComplaint.jsx** → Call `approveComplaint()` or `rejectComplaint()`

All these pages already have the structure and error handling - just need API calls!

---

## ✨ Testing the UI with Mock Login

If backend isn't ready yet, you can still test:

1. Test text colors on login page
2. Test responsive layout
3. Test Framer Motion animations
4. Test navigation between pages (auth won't work, but routing will)

The authentication is optional for visual testing!

---

**Backend Integration Status**: ✅ Ready for Testing
**Text Colors Fixed**: ✅ All visible on dark backgrounds
**Error Handling**: ✅ Implemented in Login page
