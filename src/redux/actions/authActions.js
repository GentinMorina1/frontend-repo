import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post('http://backend.test/api/login', credentials);
      const userData = response.data;

      if (userData.role === 'admin') {
        useNavigate().push('/admin-dashboard');
      } else {
        useNavigate().push('/user-dashboard');
      }

      return userData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
