// LoginPage.js
import React, { useState } from 'react';

import axios from 'axios';

// Set base URL for Axios requests
axios.defaults.baseURL = 'http://localhost:5000';

function LoginPage() {
    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const fetchData = async () => {
        try {
            const response = await axios.post('/api/test');
            console.log(response);
            setMessage(response.data.message);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const fetchBookData = async () => {
        try {
            const response = await axios.post('/api/books');
            console.log(response);
            setMessage2(response.data.length);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { username, password });
            console.log('Login response:', response.data);
            // Here you can handle successful login, e.g., redirect to dashboard
        } catch (error) {
            console.error('Login error:', error);
            // Here you can handle login errors, e.g., display error message
        }
    };


    return (
        <div>
            <h2>Login Page</h2>
            <button onClick={fetchData}>Fetch Test Data</button>
            <p>{message}</p>

            <button onClick={fetchBookData}>Fetch Book Data</button>
            <p>{message2}</p>
            {/* Add login form here */}
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
        </div>
    );
}

export default LoginPage;
