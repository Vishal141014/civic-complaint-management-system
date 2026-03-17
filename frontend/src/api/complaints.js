import axios from 'axios';
import { buildAuthHeader } from './auth';

const API_BASE_URL = 'http://localhost:8000';

const complaintsApi = axios.create({
  baseURL: API_BASE_URL,
});

export const submitComplaint = (data, token) => {
  return complaintsApi.post('/complaints/submit', data, {
    headers: buildAuthHeader(token),
  });
};

export const getComplaints = (filters = {}, token) => {
  return complaintsApi.get('/complaints', {
    params: filters,
    headers: buildAuthHeader(token),
  });
};

export const assignComplaint = (id, data, token) => {
  return complaintsApi.put(`/complaints/${id}/assign`, data, {
    headers: buildAuthHeader(token),
  });
};

export const approveComplaint = (id, token) => {
  return complaintsApi.put(
    `/complaints/${id}/approve`,
    {},
    {
      headers: buildAuthHeader(token),
    }
  );
};

export const rejectComplaint = (id, token) => {
  return complaintsApi.put(
    `/complaints/${id}/reject`,
    {},
    {
      headers: buildAuthHeader(token),
    }
  );
};

export const reraiseComplaint = (id, data, token) => {
  return complaintsApi.post(`/complaints/${id}/reraise`, data, {
    headers: buildAuthHeader(token),
  });
};

export const uploadPhoto = (file, type, token) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  return complaintsApi.post('/uploads/photo', formData, {
    headers: {
      ...buildAuthHeader(token),
      'Content-Type': 'multipart/form-data',
    },
  });
};
