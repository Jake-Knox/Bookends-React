// LoginPage.js
import React, { useState } from 'react';

import LoginForm from '../components/login/LoginForm';

import axios from 'axios';
// Set base URL for Axios requests
axios.defaults.baseURL = 'http://localhost:5000';

function LoginPage() {

    const [message, setMessage] = useState('');
    const [message2, setMessage2] = useState('');

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

    return (
        <div className='page login'>
            <h2>Login Page</h2>
            <button onClick={fetchData}>Fetch Test Data</button>
            <p>{message}</p>

            <button onClick={fetchBookData}>Fetch Book Data</button>
            <p>{message2}</p>

            <LoginForm />
        </div>
    );
}

export default LoginPage;
