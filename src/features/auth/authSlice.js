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
            // state.user = action.payload.user;
            state.role = action.payload.role;
            window.localStorage.setItem('accessToken', action.payload.token);
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.role = null;
            window.localStorage.removeItem('accessToken');
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
