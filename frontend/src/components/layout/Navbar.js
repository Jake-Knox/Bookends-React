import React from 'react';
import { useAuth } from '../../context/AuthProvider';

import { Link } from 'react-router-dom';

import './Navbar.scss'

// I like the look of the bbc navbar
// https://www.bbc.co.uk/
// note - the list items are hidden from right->left as screen size decreses. News is last.

const Navbar = () => {
    const { isAuthenticated } = useAuth(); // the logged in user

    return (
        <nav className='navbar'>
            <img
                className=''
                src='/bookends-logo-tr.png'
                alt="Logo"
            />
            <ul className='navbar'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                {isAuthenticated ?
                    <li>
                        <Link to="/login">Logout</Link>
                    </li>
                    :
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                }
            </ul>
        </nav>
    );
};

export default Navbar;