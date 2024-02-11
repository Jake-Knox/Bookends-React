// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthProvider';
import { useParams } from 'react-router-dom';

import Shelf from '../components/bookshelf/shelves/Shelf';
import AddShelf from '../components/bookshelf/AddShelf';
import BookSearch from '../components/bookshelf/BookSearch';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

function Bookshelf() {
    const { user } = useAuth(); // the logged in user
    const { username } = useParams(); // the bookshelf owner/creator

    // fill in these state fields as needed/expected
    const [bookshelfData, setBookshelfData] = useState({
        shelves: [],
        privacy: '',
    });


    // fetch user bookshelf data for rendering
    useEffect(() => {
        const fetchBookshelfData = async () => {
            try {
                const response = await axios.get(`/api/bookshelf/${username}`);
                setBookshelfData(response.data);
            } catch (error) {
                console.error('Error fetching bookshelf data:', error);
            }
        };
        fetchBookshelfData();
    }, [username]); // Run the effect whenever the username prop changes


    return (
        <div>
            <h2>{username}'s Bookshelf</h2>
            {user ? <p>Hello, {user}</p> : <p>Hello, anon</p>}
            <div className='shelves'>
                {bookshelfData.shelves.map(shelf => (
                    <Shelf
                        key={shelf._id}
                        name={shelf.name}
                        shelfBooks={shelf.books}
                    />
                ))}
            </div>
        </div>
    );
}

export default Bookshelf;
