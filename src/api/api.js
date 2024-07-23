// src/api.js
import axios from 'axios';

// Configure axios instance
const api = axios.create({
  baseURL: 'http://backend.test/api', // Replace with your backend API base URL
  timeout: 10000, // Optional timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // Optionally add authorization headers or modify request config
    // config.headers['Authorization'] = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Optionally handle response errors
    return Promise.reject(error);
  }
);

export default api;
