// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

import './follows.scss';

function Follows({ privacy, following, followers }) {

    let userTest = "testUser";

    return (
        <div className='follows'>
            <h2>Follows</h2>
            <div>
                {privacy === "public" ?
                    <div>
                        <Link to={`/following/${userTest}`}> <p>Following:{following.length}</p></Link>
                        <Link to={`/followers/${userTest}`}> <p>Followers:{followers.length}</p></Link>
                    </div>
                    :
                    <div>
                        <p>Following:{following.length}</p>
                        <p>Followers:{followers.length}</p>
                    </div>}
            </div>
        </div>
    );
}

export default Follows;
