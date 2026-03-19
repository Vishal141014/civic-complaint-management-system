import axiosInstance from '../config/axios';
import API from '../config/api';

/**
 * Submit a new complaint
 * @param {object} data - Complaint data
 * @returns {Promise} Response with created complaint
 */
export const submitComplaint = (data) => {
  return axiosInstance.post(API.SUBMIT, data);
};

/**
 * Get all complaints with optional filters
 * @param {object} filters - Query filters
 * @returns {Promise} Response with complaints list
 */
export const getComplaints = (filters = {}) => {
  return axiosInstance.get(API.GET_ALL, {
    params: filters,
  });
};

/**
 * Assign complaint to worker
 * @param {string} id - Complaint ID
 * @param {object} data - Assignment data
 * @returns {Promise} Response confirmation
 */
export const assignComplaint = (id, data) => {
  return axiosInstance.put(API.ASSIGN(id), data);
};

/**
 * Mark complaint as complete
 * @param {string} id - Complaint ID
 * @returns {Promise} Response confirmation
 */
export const completeComplaint = (id) => {
  return axiosInstance.put(API.COMPLETE(id), {});
};

/**
 * Approve complaint
 * @param {string} id - Complaint ID
 * @returns {Promise} Response confirmation
 */
export const approveComplaint = (id) => {
  return axiosInstance.put(API.APPROVE(id), {});
};

/**
 * Reject complaint
 * @param {string} id - Complaint ID
 * @returns {Promise} Response confirmation
 */
export const rejectComplaint = (id) => {
  return axiosInstance.put(API.REJECT(id), {});
};

/**
 * Re-raise complaint
 * @param {string} id - Complaint ID
 * @param {object} data - Re-raise data
 * @returns {Promise} Response with new complaint
 */
export const reraiseComplaint = (id, data) => {
  return axiosInstance.post(API.RERAISE(id), data);
};

/**
 * Upload photo for complaint
 * @param {File} file - File object
 * @param {string} type - Photo type ('before' or 'after')
 * @returns {Promise} Response with photo URL
 */
export const uploadPhoto = (file, type) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('type', type);

  return axiosInstance.post(API.UPLOAD_PHOTO, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
