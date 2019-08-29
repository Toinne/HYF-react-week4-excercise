import React from 'react';

import './TodoItem.css';

export default ({ _id, done, description, onResolve, onEditClick }) => {

    const onResolveClick = (event) => {
        event.preventDefault();
        onResolve(_id);
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        onEditClick(_id);
    };

    return (
        <li className="TodoItem">
            <button onClick={onResolveClick} className={`TodoItem--resolve ${done? 'resolved' : ' '}`}>✓</button>
            <span>{description}</span>
            <button onClick={handleEditClick} className="TodoItem--edit">Edit</button>
        </li>
    )
}
