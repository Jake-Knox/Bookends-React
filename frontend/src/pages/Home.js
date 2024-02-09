import React from 'react';
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div>
            <h2>Home</h2>
            <Link to={'/login'}>
                <li>Login</li>
            </Link>
        </div>
    );
}

export default Home;
