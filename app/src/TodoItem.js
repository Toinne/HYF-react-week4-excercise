import React from 'react';

import './TodoItem.css';

export default ({ _id, done, description, onResolve, onEdit }) => {

    const onResolveClick = (event) => {
        event.preventDefault();
        onResolve(_id);
    };

    const onEditClick = (event) => {
        event.preventDefault();
        onEdit(_id);
    };

    return (
        <li className="TodoItem">
            <button onClick={onResolveClick} className={`TodoItem--resolve ${done? 'resolved' : ' '}`}>✓</button>
            <span>{description}</span>
            <button onClick={onEditClick} className="TodoItem--edit">Edit</button>
        </li>
    )
}
