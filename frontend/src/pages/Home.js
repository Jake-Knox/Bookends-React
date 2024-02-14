import React from 'react';
import { Link } from 'react-router-dom'

function Home() {

    return (
        <div className='page homepage'>
            <h2>Home</h2>
            <Link to={'/user123/bookshelf'}>
                <li>user123's bookshelf</li>
            </Link>
            <Link to={'/user124/bookshelf'}>
                <li>user124's bookshelf</li>
            </Link>
            <Link to={'/user125/bookshelf'}>
                <li>user125's bookshelf</li>
            </Link>
            <Link to={'/janeAusten1/bookshelf'}>
                <li>janeAusten1's bookshelf</li>
            </Link>
            <Link to={'/jake-knox/bookshelf'}>
                <li>jake-knox's bookshelf</li>
            </Link>
            <Link to={'/testUser1/bookshelf'}>
                <li>testUser1's bookshelf</li>
            </Link>
        </div>
    );
}

export default Home;
