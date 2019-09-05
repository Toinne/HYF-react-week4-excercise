import React from 'react';

import './TodoItem.css';
var moment = require('moment');

export default ({ _id, description, onResolve, onEdit, done, deadline, onDelete }) => {

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
        console.log(_id)
    };

    const today = moment().format();
const b = moment(deadline);
const days = b.diff(today, "days");
     const deadlineAlert=
      days === 0 ? {backgroundColor: `yellow`}:
      days < 0 ? {backgroundColor:`red`}:
      days >= 1 ? {backgroundColor:`green`}:
      {};
    return (
        <li className="TodoItem" style={deadlineAlert}>
            <button onClick={onResolveClick} style={done === true ? {backgroundColor:`green`}:{}} className="TodoItem--resolve" >✓</button>
            <span style={done === true ? { textDecoration: 'line-through' } : {} } >
                {description}
            </span>
            <button disabled={done} onClick={onEditClick} className={`TodoItem--edit ${done? `visibility`: ``}`}>Edit</button>
            <button disabled={done} onClick={onDeleteClick} className={`TodoItem--edit ${done? `visibility`: ``}`}>Delete</button>
        </li>
    )
}
