// src/api/apiUtils.js
import api from './api';

export const getSignatures = () => api.get('/signatures');
export const getUsers = () => api.get('/users');
export const getMetrics = () => api.get('/metrics');
export const postSignature = (data) => api.post('/signatures', data);
export const deleteSignature = (id) => api.delete(`/signatures/${id}`);
