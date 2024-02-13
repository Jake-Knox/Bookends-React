import React, { useState } from 'react';
import { Link } from 'react-router-dom'

import { useAuth } from '../../context/AuthProvider';

import './LoginForm.scss'

import axios from 'axios';
// Set base URL for Axios requests
axios.defaults.baseURL = 'http://localhost:5000';

const LoginForm = () => {
    const { login, logout } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            const { token } = response.data;
            // console.log('Login response:', response.data);

            login(token, username); // Pass the token to the login function

        } catch (error) {
            console.error('Login error:', error.response.data);
            // Here you can handle login errors, e.g., display error message
        }
    };

    const logoutClick = async () => {
        logout();
    }

    return (
        <div className='LoginForm'>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Login</button>
            </form>
            <button className='logout-button' onClick={logoutClick}>Log out</button>

            <Link to={'/dashboard'}>
                <li>Dashboard</li>
            </Link>
        </div>
    );
}


export default LoginForm;