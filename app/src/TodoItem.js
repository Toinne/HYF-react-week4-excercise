import React from 'react';
import './TodoItem.css';
import moment from 'moment';

export default ({ _id, done, description, onResolve, onEditClick, deadline }) => {

    const onResolveClick = (event) => {
        event.preventDefault();
        onResolve(_id);
    };

    const handleEditClick = (event) => {
        event.preventDefault();
        onEditClick(_id);
    };

const then = moment(deadline);
const now = moment();
const different = then.diff(now, 'days');
const expiredDate = now.isAfter(then);
let backgroundColor;
if(expiredDate) {
  backgroundColor = 'red';
}else if(different <= 2){
  backgroundColor = 'white';
}

    return (

        <li className={`TodoItem ${done? 'resolved' : ' '}`}
          style={{backgroundColor}}>
            <button onClick={onResolveClick}>✓</button>
            <span>{description}</span>
            <span>{deadline}</span>
            <button onClick={handleEditClick} className="TodoItem--edit">Edit</button>
        </li>

    )
}
