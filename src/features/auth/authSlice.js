// features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        token: null,
        user: null,
        role: null,
    },
    reducers: {
        login: (state, action) => {
            state.token = action.payload.token;
            state.role = action.payload.role;
            window.localStorage.setItem('accessToken', action.payload.token);
            window.localStorage.setItem('role-user', action.payload.role);
            window.localStorage.setItem('user-id', action.payload.id);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.role = null;
            window.localStorage.removeItem('accessToken');
            window.localStorage.removeItem('role-user');
            window.localStorage.removeItem('user-id');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
