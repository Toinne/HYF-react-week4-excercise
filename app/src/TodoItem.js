import React from 'react';
import moment from 'moment';

import './TodoItem.css';

export default ({ _id, description, deadline, onResolve, onEditClick, done, deleteTodo, }) => {

    const onResolveClick = (event) => {
        onResolve(_id);
    };

    const onEdit = (event) => {
        onEditClick(_id);
    };
    const onDeleteClick = (event) => {
        deleteTodo(_id);
    };
    const dateStyle = {
        color: " yellow"
    };
    const today = moment();
    console.log(today);
    const b = moment(deadline);
    const days = b.diff(today, 'days');


    return (
        <li className="TodoItem" style={days <= 2 ? dateStyle : { color: 'red' }} >
            <button onClick={onResolveClick} className="TodoItem--resolve">✓</button>
            <span style={done === true ? { textDecoration: 'line-through' } : {}}>{description}</span>
            <span>{deadline}</span>
            <button onClick={onEdit} className="TodoItem--edit">Edit</button>
            <button onClick={onDeleteClick} className="TodoItem--delete">Delete</button>
        </li>
    )
}
