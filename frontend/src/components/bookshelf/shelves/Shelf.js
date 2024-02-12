// Dashboard.js
import React from 'react';
import Book from './Book';

import './shelf.scss';

function Shelf({ name, shelfBooks }) {
    return (
        <div className='shelf'>
            <h3>{name}</h3>
            {shelfBooks.map(book => (
                <Book
                    key={book._id}
                    title={book.title}
                    author={book.author}
                />
            ))}
        </div>
    );
}

export default Shelf;
