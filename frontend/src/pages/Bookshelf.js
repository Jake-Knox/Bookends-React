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
    const { user, token } = useAuth(); // the logged in user
    const { username } = useParams(); // the bookshelf owner/creator

    // fill in these state fields as needed/expected
    const [bookshelfData, setBookshelfData] = useState({
        shelves: [],
        privacy: '',
    });


    // fetch user bookshelf data for rendering
    useEffect(() => {
        // viewing their own bookshelf
        if (user === username) {
            const fetchBookshelfData = async () => {
                try {
                    const response = await axios.get(`/getMyBookhelf`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    // response from server
                    if (response.status === 200) {
                        console.log(response.data)
                        setBookshelfData(response.data.bookshelf);
                    }
                    else {
                        console.error('Error in response getting user bookshelf:', response.statusText);
                        // No User Found
                    }
                } catch (error) {
                    console.error('Error fetching bookshelf data:', error);
                }
            };
            fetchBookshelfData();
        } else {
            // viewing another user's bookshelf/ not logged in
            const fetchBookshelfData = async () => {
                try {
                    const response = await axios.get(`/getUserBookshelf/${username}`);
                    // response from server
                    if (response.status === 200) {
                        console.log(response.data)
                        setBookshelfData(response.data.bookshelf);
                    }
                    else {
                        console.error('Error in response getting user bookshelf:', response.statusText);
                        // No User Found
                    }
                } catch (error) {
                    console.error('Error fetching bookshelf data:', error);
                }
            };
            fetchBookshelfData();
        }
    }, [username, user, token]); // Run the effect whenever the username prop changes


    return (
        <div>
            <h2>{username}'s Bookshelf</h2>
            {user ? <p>Hello, {user}</p> : <p>Hello, anon</p>}

            <BookSearch />

            <div className='shelves'>
                {bookshelfData.shelves.map(shelf => (
                    <Shelf
                        key={shelf._id}
                        name={shelf.name}
                        shelfBooks={shelf.books}
                    />
                ))}
            </div>

            <AddShelf />
        </div>
    );
}

export default Bookshelf;
