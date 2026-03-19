import axiosInstance from '../config/axios';
import API from '../config/api';

/**
 * Login with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Response with token and user data
 */
export const loginRequest = (email, password) => {
  return axiosInstance.post(API.LOGIN, { email, password });
};

/**
 * Register new user
 * @param {string} name - Full name
 * @param {string} email - Email address
 * @param {string} phone - Phone number
 * @param {string} password - Password
 * @param {string} department - Department (optional)
 * @param {string} role - User role (default: 'citizen')
 * @returns {Promise} Response with created user and token
 */
export const registerRequest = (name, email, phone, password, department = null, role = 'citizen') => {
  return axiosInstance.post(API.REGISTER, {
    name,
    email,
    phone,
    password,
    role,
    department,
  });
};

/**
 * Verify token validity with backend
 * @param {string} token - JWT token to validate
 * @returns {Promise} Response with user data if valid
 */
export const verifyTokenRequest = (token) => {
  return axiosInstance.get(API.ME || '/api/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).catch(() => ({ data: null }));
};
