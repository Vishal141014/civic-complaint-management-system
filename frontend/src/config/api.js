const BASE_URL = "http://localhost:8000"

export const API = {
  // Auth
  LOGIN:    `${BASE_URL}/auth/login`,
  REGISTER: `${BASE_URL}/auth/register`,
  ME:       `${BASE_URL}/auth/me`,
  
  // Complaints
  SUBMIT:      `${BASE_URL}/complaints/submit`,
  GET_ALL:     `${BASE_URL}/complaints`,
  ASSIGN:      (id) => `${BASE_URL}/complaints/${id}/assign`,
  COMPLETE:    (id) => `${BASE_URL}/complaints/${id}/complete`,
  APPROVE:     (id) => `${BASE_URL}/complaints/${id}/approve`,
  REJECT:      (id) => `${BASE_URL}/complaints/${id}/reject`,
  RERAISE:     (id) => `${BASE_URL}/complaints/${id}/reraise`,
  
  // Uploads
  UPLOAD_PHOTO: `${BASE_URL}/uploads/photo`,
  PHOTO_URL:    (path) => `${BASE_URL}/${path}`,
  
  // Notifications
  NOTIFICATIONS: `${BASE_URL}/notifications`,
  MARK_READ:     (id) => `${BASE_URL}/notifications/${id}/read`,
  
  // Stats
  STATS: `${BASE_URL}/stats/city`,
  
  // Departments
  DEPARTMENTS: `${BASE_URL}/departments`,
}

export default API
