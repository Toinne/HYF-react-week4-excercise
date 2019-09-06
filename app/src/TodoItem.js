import React from 'react';

import './TodoItem.css';

export default ({ _id, description, onResolve, onEdit }) => {

    const onResolveClick = (event) => {
        event.preventDefault();
        onResolve(_id);
    };

    const onEditClick = (event) => {
        event.preventDefault();
        onEdit(_id);
    };
     const onDeleteClick = (event) => {
        event.preventDefault();
        onDelete(_id);
    };

    const then = moment(deadline);
    const now = moment();
    const countdown = then.diff(now,'days');

    return (
        <li className="TodoItem" style={countdown<= 2 ? {backgroundColor : 'red'}: {backgroundColor: 'yellow'}}>
            <button onClick={onResolveClick} className="TodoItem--resolve">✓</button>
            <span>{description}</span>
            <span>{deadline}</span>
            <button onClick={onEditClick} className="TodoItem--edit">Edit</button>
            <button onClick={onDeleteClick} className="TodoItem--delete">Delete</button>

        </li>
    )
}
