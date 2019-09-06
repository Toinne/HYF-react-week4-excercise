import React from 'react';
import moment from 'moment';

import './TodoItem.css';

export default ({ _id, description, deadline, onResolve, onEdit, done, deleteTodo, }) => {

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
        deleteTodo(_id);
    };

    const dateApproach = {
        backgroundColor : 'yellow'
    };

    const today = moment().format('YYYY MM DD');
    const b = moment(deadline);
    const days = b.diff(today, 'days');

   
    return (
        <li className="TodoItem" style={days <= 2 ? dateApproach : {} }>
            <button onClick={onResolveClick} className="TodoItem--resolve">✓</button>
            <span style={done === true ? {textDecoration: 'line through'} : {} }>{description}</span>
            <span>{deadline}</span>
            <button onClick={onEditClick} className="TodoItem--edit">Edit</button>
            <button onClick={onDeleteClick} className="TodoItem--edit">Delete</button>
        </li>
    )
}