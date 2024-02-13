// Dashboard.js
import React from 'react';
import Shelf from './Shelf';

import './shelves.scss';

function Shelves({ shelves }) {
    return (
        <div className='shelves'>
            {shelves.map(shelf => (
                <Shelf
                    key={shelf._id}
                    name={shelf.name}
                    privacy={shelf.privacy}
                    shelfBooks={shelf.books}
                />
            ))}
        </div>
    );
}

export default Shelves;
