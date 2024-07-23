// src/pages/Login.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/actions';
import '../styles/login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://backend.test/api/login', { email, password });
            const { token, user, role } = response.data;
            localStorage.setItem('token', token);
            dispatch(login({ user, role }));

            // Redirect based on user role
            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            console.error('Login Error:', error);
            // Handle login error (show message to user)
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Login;
