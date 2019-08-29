import React from 'react';
import { NavLink } from 'react-router-dom';

import './TodoNavigation.css';

export default () => {
    return (
        <nav className="TodoNavigation">
          <NavLink to="/" exact activeClassName="active">All</NavLink>
            <NavLink to="/work" exact activeClassName="active">Work</NavLink>
            <NavLink to="/private" exact activeClassName="active" >Private</NavLink>
            <NavLink to="/add" exact activeClassName="active" >Add todo</NavLink>
        </nav>
    )
}
