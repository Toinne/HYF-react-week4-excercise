import React from 'react';

import './TodoItem.css';

export default ({ _id, description, onResolve, onEdit }) => {

  const onResolveClick = (event) => {
    onResolve(_id);
  };

  const onEditClick = (event) => {
    onEdit(_id);
  };

  return (
    <li className="TodoItem">
      <button onClick={onResolveClick} className="TodoItem--resolve">✓</button>
      <span>{description}</span>
      <button onClick={onEditClick} className="TodoItem--edit">Edit</button>
    </li>
  );
}