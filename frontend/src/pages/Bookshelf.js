// Dashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';

function Bookshelf() {
    const { username } = useParams();

    return (
        <div>
            <h2>{username}'s Bookshelf</h2>
        </div>
    );
}

export default Bookshelf;
