# Visual Architecture & Workflow Diagrams

## 1. User Authentication Flow

```
┌─────────────────────────────────────────────────────────┐
│                     LOGIN PAGE                           │
│  Enter: Phone + Password + Select Role                   │
└──────────────────────┬──────────────────────────────────┘
                       │
                       ▼
         ┌─────────────────────────────┐
         │   AuthContext.login()        │
         │  - Create JWT token         │
         │  - Store in localStorage    │
         │  - Set auth state           │
         └──────────┬──────────────────┘
                    │
        ┌───────────┴───────────┐
        │                       │
        ▼                       ▼
    Token Valid         Redirect to Dashboard:
    Role Matched        /citizen/my-complaints (Blue)
                        /admin/dashboard (Orange)
                        /worker/tasks (Green)
                        /superadmin/dashboard (Purple)
```

## 2. Role-Based Route Protection

```
┌──────────────────────────────┐
│  User tries to access route  │
│  e.g., /admin/dashboard      │
└──────────────┬───────────────┘
               │
               ▼
      ┌─────────────────────┐
      │  PrivateRoute check │
      └─────────┬───────────┘
                │
        ┌───────┴─────────┐
        │                 │
        ▼                 ▼
    Token Check        Role Check
        │                 │
        NO                ▼
        │            Role matches?
        │                 │
        │         ┌───────┴────────┐
        │         │                │
        │         YES              NO
        │         │                │
        │         ▼                ▼
        │     RENDER          /unauthorized
        │     COMPONENT
        │
        ▼
    /login
```

## 3. Component Hierarchy

```
App (Route Config)
│
├── Navbar (Role-based links)
│   ├── User name
│   ├── RoleBadge
│   └── Logout button
│
└── Routes
    ├── /login → Login.jsx
    │
    ├── /citizen/* (PrivateRoute + Citizen)
    │   ├── /submit → SubmitComplaint
    │   │   └── PhotoUpload
    │   ├── /my-complaints → MyComplaints
    │   │   └── ComplaintCard[]
    │   ├── /complaint/:id → ComplaintDetail
    │   └── /reraise/:id → ReRaise
    │
    ├── /admin/* (PrivateRoute + Admin)
    │   ├── /dashboard → AdminDashboard
    │   ├── /assign/:id → AssignComplaint
    │   └── /review/:id → ReviewComplaint
    │       └── Photo comparison
    │
    ├── /worker/* (PrivateRoute + Worker)
    │   ├── /tasks → WorkerTasks
    │   │   └── Task cards
    │   ├── /task/:id → TaskDetail
    │   └── /upload/:id → UploadCompletion
    │       └── PhotoUpload
    │
    └── /superadmin/* (PrivateRoute + SuperAdmin)
        ├── /dashboard → SuperDashboard
        │   └── Department table
        └── /analytics → Analytics
            ├── Sentiment chart
            ├── Category breakdown
            └── Hotspot map
```

## 4. Data Flow: Complaint Submission (Citizen)

```
User fills form:
- Category
- Address  
- Description
- Photos (1-3)
│
▼
Click "Submit Complaint"
│
▼
handleSubmit() function:
- Validate fields
- Create FormData
- Add photos
- Show loading
│
▼
API Call (Future):
POST /api/complaints
FileData: {
  category,
  address,
  description,
  photos[0], photos[1], ...
}
│
▼
Success:
- Show success message
- Navigate to /my-complaints
- Refresh complaints list
│
▼
Display in MyComplaints page:
- New card appears
- Status: "submitted"
- Can click to view details
```

## 5. Admin Workflow: Assign & Review

```
STEP 1: VIEW DASHBOARD
┌──────────────────────────────┐
│ Admin Dashboard (Table View) │
│                              │
│ ID  | Citizen  | Status | Act│
│ CMP-001          ... [Assign]│
│ CMP-002          ... [Assign]│
└───────┬──────────────────────┘
        │
        ▼ Click [Assign]
┌──────────────────────────────────┐
│ STEP 2: ASSIGN TO WORKER         │
│                                  │
│ Select Worker:  [Worker A ▼]     │
│ Set Deadline:   [2024-02-01]     │
│ [Submit]                         │
└───────┬──────────────────────────┘
        │
        ▼ Worker completes work, uploads photos
┌──────────────────────────────────┐
│ STEP 3: REVIEW BEFORE/AFTER      │
│                                  │
│ [Before Photo]  [After Photo]    │
│                                  │
│ Worker Notes: "Fixed the road"   │
│                                  │
│ [✓ Approve]  [✗ Reject]          │
└──────────────────────────────────┘
```

## 6. Worker Workflow: Complete Task

```
Login as Worker
│
▼
/worker/tasks page
├─ PENDING: CMP-001 (Road) [2 days left]
├─ PENDING: CMP-002 (Water) [OVERDUE!]
└─ IN PROGRESS: CMP-003 (Light)
│
▼ Click on CMP-001 card
┌────────────────────────────┐
│ /worker/task/CMP-001       │
│                            │
│ Category: Road Damage      │
│ Location: Main Street      │
│ Description: ...           │
│ [Current Photo]            │
│                            │
│ Work Notes:                │
│ [Textarea]                 │
│ [💾 Save Notes]            │
│ [📸 Upload Photos]         │
└────────────────────────────┘
│
▼ Click [📸 Upload Photos]
┌────────────────────────────┐
│ Upload After Photos        │
│                            │
│ [Drag files here...]       │
│ [Preview 1] [Preview 2]    │
│                            │
│ [📤 Mark Work Done]        │
└────────────────────────────┘
│
▼ Work complete!
Admin will review & approve
```

## 7. Auth Context State Flow

```
Initial State (Mount):
┌──────────────────────────────┐
│ loading: true                │
│ token: null                  │
│ user: null                   │
│ role: null                   │
│ userId: null                 │
└──────────────────────────────┘
           │
           ▼
Check localStorage for auth
           │
    ┌──────┴──────┐
    │             │
  Found        Not Found
    │             │
    ▼             ▼
Parse JSON    Set loading: false
Restore auth  Empty auth state
    │             │
    └──────┬──────┘
           │
           ▼
    Auth Ready (loading: false)
```

## 8. Navigation Flow By Role

```
CITIZEN (Blue) 🔵
Navigator sees:
├── Submit Complaint
├── My Complaints
└── Logout

ADMIN (Orange) 🟠
Navigator sees:
├── Dashboard
├── Assign
├── Review
└── Logout

WORKER (Green) 🟢
Navigator sees:
├── My Tasks
└── Logout

SUPER ADMIN (Purple) 🟣
Navigator sees:
├── Dashboard
├── Analytics
└── Logout

If wrong role tries wrong path:
Navigate(/admin/dashboard) as Citizen
        ↓
PrivateRoute checks
        ↓
Role: 'citizen' ≠ 'admin'
        ↓
Navigate(/unauthorized)
        ↓
"Access Denied" page
```

## 9. File Upload Lifecycle (PhotoUpload Component)

```
User selects files
        │
        ▼
handleFileChange() triggered
        │
        ├─ Check file count ≤ maxFiles
        ├─ Check file type (JPEG/PNG)
        ├─ Check file size ≤ maxSizeMB
        │
        ▼ All valid?
        │
    ┌───┴────┐
    │        │
   YES      NO
    │        │
    ▼        ▼
Create    Show error message
FileReader
    │
    ▼
Read as DataURL
    │
    ▼
Show thumbnail preview
    │
    ▼
Call onUpload() callback
(Parent component receives files)
    │
    ▼
User continues (click ✕ to remove)
    │
    ▼
Form submitted with FormData
(containing files)
```

## 10. API Integration Architecture (Future)

```
┌──────────────────────────────────────────────────────┐
│              Frontend (React App)                    │
│                                                      │
│  ┌───────────────┐  ┌──────────────┐                │
│  │ React Pages   │  │ AuthContext  │                │
│  └───────┬───────┘  └─────┬────────┘                │
│          │                │                         │
│          └────────┬───────┘                         │
│                   │                                 │
│          ┌────────▼──────┐                          │
│          │  API Service  │                          │
│          │  (complaints) │                          │
│          └────────┬──────┘                          │
│                   │                                 │
│         ┌─────────┴─────────┐                       │
│    Authorization     Content-Type:
│    Bearer <token>    application/json
│                                                      │
└────────────────┬─────────────────────────────────────┘
                 │
                 │ HTTPS
                 │
┌────────────────▼─────────────────────────────────────┐
│            Backend (Django/Flask/etc)                │
│                                                      │
│  ┌──────────────────────────────────────────┐       │
│  │ API Endpoints:                           │       │
│  │ POST   /api/auth/login                   │       │
│  │ POST   /api/complaints                   │       │
│  │ GET    /api/complaints/{id}              │       │
│  │ GET    /api/workers/{id}/tasks           │       │
│  │ POST   /api/complaints/{id}/assign       │       │
│  │ POST   /api/complaints/{id}/completion   │       │
│  │ GET    /api/analytics                    │       │
│  └──────────────────────────────────────────┘       │
│                    │                                 │
│         ┌──────────▼──────────┐                     │
│         │    Database         │                     │
│         │  (Users/Complaints) │                     │
│         └─────────────────────┘                     │
└──────────────────────────────────────────────────────┘
```

## 11. Complaint Status Progression

```
Citizen submits complaint
        │
        ▼
Status: submitted
(Assigned: No worker yet)
        │
Admin reviews & assigns
        │
        ▼
Status: assigned
(Assigned to: Worker A)
        │
Worker starts work
        │
        ▼
Status: in_progress
        │
Worker uploads completion photos
        │
        ▼
Status: pending_approval
        │
Admin reviews before/after
        │
    ┌───┴────────┐
    │            │
Approve      Reject
    │            │
    ▼            ▼
Status:      Reassign
resolved     (goes back to
             Admin or
             assigned)
    │
    ▼
Citizen can see before/after
(Option to Re-raise if not satisfied)
```

## 12. Error Handling Flow

```
API Call
    │
    ├─ Network Error
    │  └─► Show: "Connection failed"
    │
    ├─ 401 Unauthorized
    │  └─► logout() + redirect to /login
    │
    ├─ 403 Forbidden
    │  └─► Show: "Access Denied"
    │
    ├─ 404 Not Found
    │  └─► Show: "Complaint not found"
    │
    ├─ 500 Server Error
    │  └─► Show: "Something went wrong"
    │
    └─ Success (2xx)
       └─► Process data
           Update UI
           Show success message
```

---

## Quick Decision Trees

### "Can this user access this page?"

```
User at /admin/dashboard

1. Is user logged in?
   NO → Go to /login
   YES → Continue

2. Does user have 'admin' role?
   NO → Go to /unauthorized
   YES → Show AdminDashboard ✓
```

### "Which dashboard should appear?"

```
User just logged in

1. Get role from auth state
   a. role === 'citizen' → /citizen/my-complaints
   b. role === 'admin' → /admin/dashboard
   c. role === 'worker' → /worker/tasks
   d. role === 'superadmin' → /superadmin/dashboard
```

### "What can a worker see?"

```
Worker logs in

1. Can see:
   ✓ Only their assigned tasks (/worker/tasks)
   ✓ Task details (/worker/task/:id)
   ✓ Complaint photos (theirs only)
   ✓ Upload completion (/worker/upload/:id)

2. Cannot see:
   ✗ Other worker's tasks
   ✗ All complaints (admin only)
   ✗ Analytics (superadmin only)
   ✗ Admin dashboard
```

---

**These diagrams help visualize how the entire role-based system works together!** 🎯
