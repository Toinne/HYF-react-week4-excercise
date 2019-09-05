import React from 'react';
import './NoTodoItem.css';
function NoTodoItem(props) {
  return (
    <h1>Horray! No more Todo item for {props.category} </h1>
  );
}
export default NoTodoItem;
