// src/axiosInstance.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://backend.test/api',
  
  // Base URL for all requests
});

export default axiosInstance;
