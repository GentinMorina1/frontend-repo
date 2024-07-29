// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { role } = useSelector((state) => state.auth);

  return role ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
