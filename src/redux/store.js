// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import adminReducer from '../features/admin/adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    admin: adminReducer,
  },
  // You can also add middleware if needed
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
});
