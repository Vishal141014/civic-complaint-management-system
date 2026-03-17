import axios from 'axios';
import { buildAuthHeader } from './auth';

const API_BASE_URL = 'http://localhost:8000';

const notificationsApi = axios.create({
  baseURL: API_BASE_URL,
});

export const getNotifications = (token) => {
  return notificationsApi.get('/notifications', {
    headers: buildAuthHeader(token),
  });
};
