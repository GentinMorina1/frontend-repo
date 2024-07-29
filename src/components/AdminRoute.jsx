// src/components/AdminRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { role } = useSelector((state) => state.auth);

  return role === 'admin' ? children : <Navigate to="/login" />;
};

export default AdminRoute;
