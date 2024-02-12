// Dashboard.js
import React from 'react';

import './book.scss'

function Book({ title, author }) {
    return (
        <div className='book'>
            <p>{author}, {title}</p>
        </div>
    );
}

export default Book;
