import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000';

export const authApi = axios.create({
  baseURL: API_BASE_URL,
});

export const loginRequest = (email, password) => {
  return authApi.post('/auth/login', { email, password });
};

export const buildAuthHeader = (token) => {
  return token ? { Authorization: `Bearer ${token}` } : {};
};
