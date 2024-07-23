// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const role = useSelector((state) => state.auth.role);

  if (role !== 'admin') {
    // Redirect to login page if not admin
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
