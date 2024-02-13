import React from 'react';
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div className='page homepage'>
            <h2>Home</h2>
            <Link to={'/login'}>
                <li>Login</li>
            </Link>
            <Link to={'/bookshelf/janeAusten1'}>
                <li>janeAusten1's bookshelf</li>
            </Link>
        </div>
    );
}

export default Home;
