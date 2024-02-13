// Dashboard.js
import React from 'react';
import Book from './Book';

import './shelf.scss';

function Shelf({ name, privacy, shelfBooks }) {
    return (
        <div className='shelf'>
            <h3>{name}, {privacy}</h3>
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
