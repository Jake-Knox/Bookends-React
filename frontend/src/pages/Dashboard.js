// Dashboard.js
import React from 'react';

import { useAuth } from '../context/AuthProvider';

function Dashboard() {
    const { user } = useAuth();


    return (
        <div>
            <h2>Dashboard</h2>
            <h3>Hello {user}</h3>
        </div>
    );
}

export default Dashboard;
