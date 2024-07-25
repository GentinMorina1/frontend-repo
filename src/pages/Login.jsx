import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice'; // Adjust the import path based on your setup
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
            const { access_token, role, id } = response.data;
    
            console.log('Login Response:', response.data);
            console.log('User Role:', role);
            console.log('Access Token:', access_token);

    
            // Dispatch login action with token and role
            dispatch(login({ token: access_token, role }));
            window.localStorage['token']=access_token
            window.localStorage['role-user']=role

            window.localStorage['user-id']=id
    
            // Redirect based on user role
            if (role === 'admin') {
                navigate('/admin-dashboard');
            } else {
                navigate('/user-dashboard');
            }
        } catch (error) {
            console.error('Login Error:', error.response?.data || error.message);
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
