// Dashboard.js
import React from 'react';
import { useParams } from 'react-router-dom';

import { Link } from 'react-router-dom';


function Follows() {
    const { username } = useParams(); // the bookshelf owner/creator

    // use effect in the follows
    // map through and display them (with links)

    return (
        <div className='follows'>
            <h2>{username}'s Follows</h2>

        </div>
    );
}

export default Follows;
