// Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

import './follows.scss';

function Follows({ privacy, following, followers }) {

    const userTest = "testUser";

    return (
        <div className='follows'>
            <h2>Follows</h2>
            <div>
                {privacy === "public" ?
                    <div>
                        <Link to={`/following/${userTest}`}> <p>Following:{following?.length || 0}</p></Link>
                        <Link to={`/followers/${userTest}`}> <p>Followers:{followers?.length || 0}</p></Link>
                    </div>
                    :
                    <div>
                        <p>Following:{following?.length || 0}</p>
                        <p>Followers:{followers?.length || 0}</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Follows;
