// AdminRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ element, ...rest }) => {
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = !!auth.token;
    const isAdmin = auth.role === 'admin';
    
    return (
        <div 
            {...rest} 
            element={isAuthenticated && isAdmin ? element : <Navigate to="/login" />}
        />
    );
};

export default AdminRoute;
