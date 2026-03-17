# Backend Integration Guide

## Quick Start: Connecting Your Backend

### Step 1: Update AuthContext - Connect to Your API

**File**: `src/context/AuthContext.jsx`

```javascript
// Update the login function to call your backend
const login = async (phone, password, role) => {
  try {
    const response = await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, password, role }),
    });

    if (!response.ok) throw new Error('Login failed');
    
    const data = await response.json();
    const token = data.token || data.access_token;
    const user = data.user || { name: data.name };
    const userRole = data.role || role;
    const userId = data.user_id || data.id;

    // Store everything in localStorage
    const authData = {
      token,
      user,
      role: userRole,
      userId,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000),
    };
    
    localStorage.setItem('auth', JSON.stringify(authData));
    setAuth({ token, user: user.name, role: userRole, userId, loading: false });
    
    return { token, user, role: userRole };
  } catch (err) {
    throw new Error(err.message || 'Authentication failed');
  }
};
```

### Step 2: Create API Service File

**File**: `src/api/complaints.js`

```javascript
const API_URL = 'http://localhost:8000/api';

const getAuthHeader = () => {
  const auth = JSON.parse(localStorage.getItem('auth') || '{}');
  return {
    'Authorization': `Bearer ${auth.token}`,
    'Content-Type': 'application/json',
  };
};

// Citizen APIs
export const submitComplaint = async (data) => {
  const formData = new FormData();
  formData.append('category', data.category);
  formData.append('address', data.address);
  formData.append('description', data.description);
  data.photos.forEach((photo, idx) => {
    formData.append(`photos[${idx}]`, photo);
  });

  const response = await fetch(`${API_URL}/complaints`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getAuthHeader()['Authorization'].split(' ')[1]}` },
    body: formData,
  });
  return response.json();
};

export const getMyComplaints = async (citizenId) => {
  const response = await fetch(`${API_URL}/citizens/${citizenId}/complaints`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

export const getComplaintDetail = async (complaintId) => {
  const response = await fetch(`${API_URL}/complaints/${complaintId}`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

// Admin APIs
export const getAllComplaints = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`${API_URL}/complaints?${params}`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

export const assignComplaint = async (complaintId, workerId, deadline) => {
  const response = await fetch(`${API_URL}/complaints/${complaintId}/assign`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ worker_id: workerId, deadline }),
  });
  return response.json();
};

export const reviewComplaint = async (complaintId, decision, reason = '') => {
  const response = await fetch(`${API_URL}/complaints/${complaintId}/review`, {
    method: 'POST',
    headers: getAuthHeader(),
    body: JSON.stringify({ decision, reason }),
  });
  return response.json();
};

// Worker APIs
export const getWorkerTasks = async (workerId) => {
  const response = await fetch(`${API_URL}/workers/${workerId}/tasks`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

export const uploadCompletion = async (complaintId, photos, notes) => {
  const formData = new FormData();
  formData.append('notes', notes);
  photos.forEach((photo, idx) => {
    formData.append(`after_photos[${idx}]`, photo);
  });

  const response = await fetch(`${API_URL}/complaints/${complaintId}/completion`, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${getAuthHeader()['Authorization'].split(' ')[1]}` },
    body: formData,
  });
  return response.json();
};

// SuperAdmin APIs
export const getAnalytics = async () => {
  const response = await fetch(`${API_URL}/analytics`, {
    headers: getAuthHeader(),
  });
  return response.json();
};

export const getDashboardStats = async () => {
  const response = await fetch(`${API_URL}/dashboard/stats`, {
    headers: getAuthHeader(),
  });
  return response.json();
};
```

### Step 3: Update Pages to Use API

**Example**: `src/pages/citizen/MyComplaints.jsx`

```javascript
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getMyComplaints } from '../../api/complaints';

const MyComplaints = () => {
  const { userId } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const data = await getMyComplaints(userId);
        setComplaints(data.complaints || data);
      } catch (err) {
        setError('Failed to fetch complaints');
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchComplaints();
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-400">{error}</div>;

  return (
    // ... render complaints
  );
};
```

---

## Expected API Endpoints

### Authentication
```
POST   /api/auth/login
  Request:  { phone, password, role }
  Response: { token, user, role, user_id }
```

### Complaints (Citizen)
```
GET    /api/citizens/{citizenId}/complaints
GET    /api/complaints/{complaintId}
POST   /api/complaints (multipart: category, address, description, photos[])
POST   /api/complaints/{id}/reraise (multipart: reason, photos[])
```

### Complaints (Admin)
```
GET    /api/complaints?status=&category=&urgency=&department_id=
POST   /api/complaints/{id}/assign { worker_id, deadline }
POST   /api/complaints/{id}/review { decision, reason }
```

### Tasks (Worker)
```
GET    /api/workers/{workerId}/tasks
GET    /api/complaints/{id}/detail
POST   /api/complaints/{id}/notes { notes }
POST   /api/complaints/{id}/completion (multipart: after_photos[], notes)
```

### Analytics (SuperAdmin)
```
GET    /api/analytics
GET    /api/dashboard/stats
GET    /api/hotspots
```

---

## Error Handling Pattern

```javascript
const handleApiCall = async (apiFunction) => {
  try {
    setLoading(true);
    setError('');
    const data = await apiFunction();
    return data;
  } catch (err) {
    const message = err.response?.data?.message || err.message || 'An error occurred';
    setError(message);
    
    // Auto-logout on 401
    if (err.response?.status === 401) {
      logout();
      navigate('/login');
    }
    
    throw err;
  } finally {
    setLoading(false);
  }
};
```

---

## CORS Configuration (Backend)

Make sure your backend allows requests from frontend:

```python
# Flask example
from flask_cors import CORS
CORS(app, origins=['http://localhost:3000'])

# Django example
CORS_ALLOWED_ORIGINS = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]
```

---

## Testing API Integration

1. **Check Network Tab**: Browser DevTools → Network
2. **Verify Headers**: Should include `Authorization: Bearer <token>`
3. **Check Payload**: Ensure FormData for file uploads
4. **Monitor Console**: See error messages

---

## Production Deployment

Update API URL in `.env`:

```env
REACT_APP_API_URL=https://api.yourdomain.com
```

Use in code:
```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
```

---

Great! Your frontend is ready to connect to the backend! 🚀
