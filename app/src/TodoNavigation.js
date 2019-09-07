import React from 'react';
import { NavLink } from 'react-router-dom';

import './TodoNavigation.css';

export default () => {
    return (
        <nav className="TodoNavigation">
            <NavLink exact activeClassName="active" to="/">Overview</NavLink>
            <NavLink exact activeClassName="active" to="/work">Work</NavLink>
            <NavLink exact activeClassName="active" to="/private">Private</NavLink>
            <NavLink exact activeClassName="active" to="/add">Add todo</NavLink>
        </nav>
    )
}