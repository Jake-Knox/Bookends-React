// Dashboard.js
import React from 'react';
import { useAuth } from '../../../context/AuthProvider';
import { useParams } from 'react-router-dom';

import Book from './Book';

import './shelf.scss';

function Shelf({ name, privacy, shelfBooks }) {
    const { user } = useAuth(); // the logged in user
    const { username } = useParams(); // the bookshelf owner/creator

    let editEnabled = false;
    if (user) {
        if (user === username) {
            editEnabled = true;
        }
        else {
            editEnabled = false;
        }
    }
    else {
        editEnabled = false;
    }

    return (
        <div className='shelf'>
            <div className='shelfTop'>
                <div>
                    <h3>{name}, {privacy}</h3>
                </div>
                {editEnabled === true ?
                    <div>
                        <button className='btnDelete'>Delete shelf</button>
                    </div>
                    :
                    <div>
                    </div>
                }
            </div>
            <div className='shelfBooks'>
                {shelfBooks.map(book => (
                    <Book
                        key={book._id}
                        bookData={book}
                    />
                ))}
            </div>
        </div>
    );
}

export default Shelf;
