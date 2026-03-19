import axios from 'axios'

// Get API URL from environment or default to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000'

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: Add token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor: Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Don't auto-redirect on 401 for login/register endpoints
    // Let those endpoints handle their own 401 errors
    const isAuthEndpoint = 
      error.config?.url?.includes('/auth/login') || 
      error.config?.url?.includes('/auth/register')

    // Handle 401 Unauthorized (but not for auth endpoints)
    if (error.response?.status === 401 && !isAuthEndpoint) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      window.location.href = '/login'
      console.warn('⚠️ Session expired. Redirecting to login...')
      return Promise.reject(new Error('Session expired. Please login again.'))
    }

    // Handle network errors
    if (!error.response) {
      console.error('❌ Server not reachable:', error.message)
      return Promise.reject(
        new Error('Server not reachable. Check if backend is running on http://localhost:8000')
      )
    }

    // Handle server errors (5xx)
    if (error.response?.status >= 500) {
      console.error('❌ Server error:', error.response.status)
      return Promise.reject(
        new Error(`Server error: ${error.response.status}`)
      )
    }

    // Return error for components to handle
    return Promise.reject(error)
  }
)

export default axiosInstance
