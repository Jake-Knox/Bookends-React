// Dashboard.js
import React from 'react';

import './book.scss'

function Book({ bookData }) {
    return (
        <div className='book'>
            {bookData.facing === "front" ?
                <div className='bookFront'>
                    <p>{bookData.author}, {bookData.title}</p>
                    <img src={bookData.thumbnail} alt={bookData.title} />
                </div>
                :
                <div className='bookSide'>
                    <p>{bookData.author}, {bookData.title}</p>
                </div>
            }

        </div>
    );
}

export default Book;
