import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../api/actions';

export default function Dashboard () {
  const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('token');
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

}