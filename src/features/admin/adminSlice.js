import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunks for fetching data
export const fetchSignatures = createAsyncThunk('admin/fetchSignatures', async () => {
  const response = await axios.get('/api/signatures');
  return response.data;
});

export const fetchUsers = createAsyncThunk('admin/fetchUsers', async () => {
  const response = await axios.get('/api/users');
  return response.data;
});

export const fetchMetrics = createAsyncThunk('admin/fetchMetrics', async () => {
  const response = await axios.get('/api/metrics');
  return response.data;
});

// Define async thunk for updating user
export const updateUser = createAsyncThunk('admin/updateUser', async (userData) => {
  const response = await axios.put(`/api/users/${userData.id}`, userData);
  return response.data;
});

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    signatures: [],
    users: [],
    metrics: {},
    status: 'idle', // or 'loading', 'succeeded', 'failed'
    error: null,
  },
  reducers: {
    // Additional reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSignatures.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSignatures.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.signatures = action.payload;
      })
      .addCase(fetchSignatures.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchMetrics.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMetrics.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.metrics = action.payload;
      })
      .addCase(fetchMetrics.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Update users array with the updated user
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default adminSlice.reducer;
