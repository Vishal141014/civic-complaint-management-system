# Role-Based CRM Frontend - Complete Architecture Guide

## Overview

This is a production-level role-based React application for a Civic Complaint Management System with 4 distinct user roles, complete route protection, and role-specific dashboards.

---

## Architecture Overview

### File Structure

```
src/
├── context/
│   └── AuthContext.jsx         # Auth state management
├── components/
│   ├── PrivateRoute.jsx        # Route protection
│   ├── Navbar.jsx              # Role-based navigation
│   ├── StatusBadge.jsx         # Status indicators
│   ├── RoleBadge.jsx           # Role indicators
│   ├── PageHeader.jsx          # Page titles
│   ├── PhotoUpload.jsx         # File uploader
│   └── ComplaintCard.jsx       # Complaint component
├── pages/
│   ├── Login.jsx               # Public login
│   ├── Unauthorized.jsx        # Access denied
│   ├── citizen/
│   │   ├── MyComplaints.jsx
│   │   ├── SubmitComplaint.jsx
│   │   ├── ComplaintDetail.jsx
│   │   └── ReRaise.jsx
│   ├── admin/
│   │   ├── AdminDashboard.jsx
│   │   ├── AssignComplaint.jsx
│   │   └── ReviewComplaint.jsx
│   ├── worker/
│   │   ├── WorkerTasks.jsx
│   │   ├── TaskDetail.jsx
│   │   └── UploadCompletion.jsx
│   └── superadmin/
│       ├── SuperDashboard.jsx
│       └── Analytics.jsx
└── App.jsx                     # Routes config
```

---

## User Roles & Permissions

### 1. **CITIZEN** 🔵
- **Route prefix**: `/citizen`
- **Permissions**:
  - Submit new complaints with photos
  - View own complaints
  - Track complaint status
  - View before/after photos
  - Re-raise resolved complaints
- **Routes**:
  - `/citizen/submit` - Submit complaint form
  - `/citizen/my-complaints` - View own complaints list
  - `/citizen/complaint/:id` - View complaint details
  - `/citizen/reraise/:id` - Re-raise complaint form

### 2. **DEPARTMENT ADMIN** 🟠
- **Route prefix**: `/admin`
- **Permissions**:
  - View all department complaints
  - Assign complaints to workers
  - Set deadlines
  - Review worker completion
  - Approve/reject work
- **Routes**:
  - `/admin/dashboard` - All complaints (table view)
  - `/admin/assign/:id` - Assign to worker
  - `/admin/review/:id` - Review before/after

### 3. **FIELD WORKER** 🟢
- **Route prefix**: `/worker`
- **Permissions**:
  - View only **assigned** complaints
  - Record work notes
  - Upload after-completion photos
  - Mark tasks done
- **Routes**:
  - `/worker/tasks` - My assigned tasks
  - `/worker/task/:id` - Task details + notes
  - `/worker/upload/:id` - Upload completion photos

### 4. **SUPER ADMIN** 🟣
- **Route prefix**: `/superadmin`
- **Permissions**:
  - Monitor all departments
  - View city-wide analytics
  - Monitor complaint hotspots
  - Override decisions
- **Routes**:
  - `/superadmin/dashboard` - All departments summary
  - `/superadmin/analytics` - Analytics & hotspots

---

## Authentication System

### Login Flow

```
User enters phone + password + role
         ↓
Login page validates input
         ↓
AuthContext.login() called:
  - Creates JWT mock token
  - Stores in localStorage as JSON
  - Sets auth state (token, user, role, userId)
         ↓
App redirects to role-specific dashboard
         ↓
PrivateRoute checks:
  - Token exists? → Continue
  - Token missing? → /login
  - Role doesn't match? → /unauthorized
```

### Auth Context Methods

```javascript
import { useAuth } from '@/context/AuthContext';

const { 
  token,           // JWT token string
  user,            // User object { name, id, phone }
  role,            // 'citizen', 'admin', 'worker', 'superadmin'
  userId,          // User ID
  isAuthenticated, // Boolean
  hasRole,         // Function: hasRole('admin') → true/false
  login,           // Function: login(token, user, role, userId)
  logout,          // Function: logout()
  loading          // Boolean (on mount)
} = useAuth();
```

### Logout Flow

```javascript
const handleLogout = () => {
  logout();           // Clear localStorage
  navigate('/login'); // Redirect to login
};
```

---

## Route Protection

### PrivateRoute Component

```jsx
<PrivateRoute allowedRoles={['citizen']}>
  <CitizenMyComplaints />
</PrivateRoute>
```

**What it does**:
1. ✅ If token exists + role matches → Render component
2. ❌ If token missing → Redirect to `/login`
3. ❌ If role doesn't match → Redirect to `/unauthorized`

---

## Component Library

### StatusBadge
Shows complaint status with appropriate colors:
```jsx
<StatusBadge status="resolved" />  // Green badge
<StatusBadge status="in_progress" /> // Purple badge
```

**Statuses**: `submitted`, `assigned`, `in_progress`, `pending_approval`, `resolved`, `re_raised`

### RoleBadge
Shows user role with color coding:
```jsx
<RoleBadge role="citizen" />    // Blue
<RoleBadge role="admin" />      // Orange
<RoleBadge role="worker" />     // Green
<RoleBadge role="superadmin" /> // Purple
```

### PhotoUpload
File upload component with validation:
```jsx
<PhotoUpload 
  maxFiles={3} 
  maxSizeMB={5}
  onUpload={(files) => setPhotos(files)}
/>
```

**Features**:
- Drag & drop support
- Image preview
- File size validation (max 5MB)
- Type validation (JPEG/PNG only)
- Remove button below each preview

### PageHeader
Page title + subtitle + action button:
```jsx
<PageHeader
  title="My Complaints"
  subtitle="Track all complaints"
  actionButton={<button>Submit New</button>}
/>
```

### ComplaintCard
Clickable card showing complaint summary:
```jsx
<ComplaintCard 
  complaint={complaintObj}
  onClick={() => navigate(...)}
/>
```

---

## Design System

### Colors
- **Primary**: Saffron `#FF6B00` (CTA buttons)
- **Citizen**: Blue `#3B82F6`
- **Admin**: Orange `#FF6B00`
- **Worker**: Green `#00A86B`
- **SuperAdmin**: Purple `#A78BFA`
- **Background**: Navy `#0A0F1E`, `#131D35`
- **Success**: Green `#00A86B`
- **Error**: Red `#EF4444`
- **Warning**: Yellow `#FCD34D`

### Typography
- **Headings**: Syne font (bold, friendly)
- **Body**: Default system font
- **Monospace**: Space Mono (IDs, codes)

### Layout
- Glassmorphism effects (backdrop blur + semi-transparent)
- Soft shadows + borders with `border-white/20`
- Rounded containers: `rounded-2xl` to `rounded-3xl`

---

## API Integration

### Setting Up Backend Calls

Replace mock data with API calls:

```javascript
// In Login.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Instead of mock login:
    // const response = await loginAPI(phone, password);
    // const { token, user, role, user_id } = response.data;
    // login(token, user, role, user_id);
    
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password, role }),
    });
    const data = await response.json();
    login(data.token, data.user, data.role, data.user_id);
    navigate(dashboards[role]);
  } catch (err) {
    setError(err.message);
  }
};
```

### Authorization Header

All API calls should include JWT token:

```javascript
const response = await fetch('/api/complaints', {
  headers: {
    'Authorization': `Bearer ${auth.token}`,
    'Content-Type': 'application/json',
  },
});
```

### Worker Gets Only Assigned Complaints

```javascript
// In WorkerTasks.jsx - fetch with worker's userId
const fetchTasks = async () => {
  const response = await fetch(`/api/complaints/assigned?worker_id=${userId}`, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  // Returns only complaints assigned to this worker
};
```

---

## Key Features

### ✅ Role-Based Access Control
- Each role has dedicated routes
- Navigating to wrong role's page → redirects to unauthorized
- Navbar shows only relevant links

### ✅ Photo Management
- Multiple file upload
- Image preview
- Validation (format, size)
- Form submission with FormData

### ✅ Glassmorphism Design
- Backdrop blur effects
- Semi-transparent backgrounds
- Soft shadows
- Smooth animations

### ✅ Responsive Layout
- Mobile-first design
- Tailwind breakpoints
- Grid layouts adapt to screen size

### ✅ Loading States
- Spinner during auth loading
- Disabled buttons during submissions
- Loading indicators on async operations

### ✅ Error Handling
- Try-catch blocks on API calls
- User-friendly error messages
- Unauthorized redirect

---

## Customization Guide

### Adding a New Role

```javascript
// 1. Update AuthContext role parsing
const parseRole = (value) => {
  if (normalized === 'newrole') return 'newrole';
  // ...
};

// 2. Create pages directory: src/pages/newrole/

// 3. Add routes in App.jsx
<Route
  path="/newrole/dashboard"
  element={
    <PrivateRoute allowedRoles={['newrole']}>
      <NewRoleDashboard />
    </PrivateRoute>
  }
/>

// 4. Update Navbar links
const getNavLinks = () => {
  switch (role) {
    case 'newrole':
      return [
        { label: 'Dashboard', path: '/newrole/dashboard' },
        // ...
      ];
  }
};
```

### Changing Colors

Update `tailwind.config.js`:
```javascript
colors: {
  saffron: '#FF6B00',    // Primary
  navy: { /* variants */ },
  // Add your colors here
}
```

### Adding Photo Validation

In `PhotoUpload.jsx`:
```javascript
const allowedFormats = ['image/jpeg', 'image/png', 'image/webp']; // Add webp
const maxFiles = 5; // Increase from 3
```

---

## Environment Variables

Create `.env` file:
```env
REACT_APP_API_URL=http://backend:8000/api
REACT_APP_JWT_EXPIRY=24h
```

Use in code:
```javascript
const apiUrl = process.env.REACT_APP_API_URL;
```

---

## Testing the Application

### Test Login (Demo Mode)

1. **Go to**: http://localhost:3000
2. **Enter any credentials**:
   - Phone: Any number
   - Password: Any password
   - Role: Select from dropdown
3. **You'll be redirected to that role's dashboard**

### Test Role-Based Access

```
1. Login as Citizen → Go to /admin/dashboard → Redirected to /unauthorized ✓
2. Login as Admin → Go to /worker/tasks → Redirected to /unauthorized ✓
3. Logout → Try to access /citizen/submit → Redirected to /login ✓
```

### Test Data Persistence

1. Login as any role
2. Refresh page → You stay logged in ✓
3. Close browser → Reopen → Still logged in ✓
4. Clear localStorage → Logged out ✓

---

## Common Issues & Solutions

### Issue: "Module not found" errors
**Solution**: Check import paths match directory structure

### Issue: "Cannot read property 'token' of null" 
**Solution**: Wrap component with `<AuthProvider>`

### Issue: Stuck on login screen after credentials entered
**Solution**: Check `hasRole()` logic accepts your role

### Issue: Images not uploading
**Solution**: Check FormData is being used correctly with multiple files

---

## Next Steps for Production

- [ ] Connect to real backend API
- [ ] Add JWT token refresh logic
- [ ] Implement real authentication
- [ ] Add error logging (Sentry, etc.)
- [ ] Set up CI/CD pipeline
- [ ] Add E2E tests (Cypress, Playwright)
- [ ] Performance monitoring
- [ ] Security audit (XSS, CSRF protection)
- [ ] Database integration for persistent storage
- [ ] Email/SMS notifications

---

## Support & Documentation

For questions or issues:
- Check component props in JSX files
- Review AuthContext usage
- Verify PrivateRoute wrapping
- Inspect localStorage for auth data

**Happy coding! 🚀**
