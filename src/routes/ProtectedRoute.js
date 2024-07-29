// // src/routes/ProtectedRoute.js
// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';

// const ProtectedRoute = ({ element, allowedRoles }) => {
//   const { role } = useSelector((state) => state.auth); // Adjust based on your state management

//   return allowedRoles.includes(role) ? element : <Navigate to="/login" />;
// };

// export default ProtectedRoute;
