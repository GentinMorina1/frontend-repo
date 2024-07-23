import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../styles/register.css";


const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const navigate = useNavigate(); // Hook for navigation
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
console.log("sda")
    try {
      // Send registration data to the backend
      const response = await fetch('http://backend.test/api/register', {
        method: 'POST', // Specify the HTTP method
        headers: {
          'Content-Type': 'application/json', // Set content type to JSON
          'Accept': 'application/json', // Specify the expected response type
        },
        body: JSON.stringify({
          name: "gentin",
          email: "gentin.morina1@gmail.com",
          password: "12345678",
       
        })
      });
      
      const data = await response.json(); // Parse the JSON response
      if (response.ok) {
        console.log('Registration successful', data);
      } else {
        console.error('Registration failed', data);
      }
      
      // Navigate to login page after successful registration
      // navigate('/login');
    } catch (error) {
      // Improved error handling
      console.error('Registration Error:', error.response?.data || error.message);
      setError(error.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Role:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit" className="register-button">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Register;
