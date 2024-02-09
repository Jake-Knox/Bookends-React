import React from 'react';
import { Link } from 'react-router-dom';

import './Navbar.scss'

// I like the look of the bbc navbar
// https://www.bbc.co.uk/
// note - the list items are hidden from right->left as screen size decreses. News is last.

const Navbar = () => {
    return (
        <nav className='navbar'>
            <img
                alt="Logo"
            />
            <ul className='navbar'>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;