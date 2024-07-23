// src/components/AdminLogin.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      await dispatch(AdminLogin(credentials)).unwrap(); // Assuming adminLogin is a thunk action
    } catch (err) {
      setError(err.message || 'Failed to login');
    }
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <input
        type="email"
        placeholder="Email"
        value={credentials.email}
        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={credentials.password}
        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {authState.loading && <p>Loading...</p>}
    </div>
  );
};

export default AdminLogin;
