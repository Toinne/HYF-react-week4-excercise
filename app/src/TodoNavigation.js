import React from 'react';
import { NavLink } from 'react-router-dom';

import './TodoNavigation.css';

export default () => {
    return (
        <nav className="TodoNavigation">
            <NavLink to="/" exact activeClassName="active" activeStyle={{ color: '#7cc6fe', backgroundColor: 'pink' }}>Overview</NavLink>
            <NavLink to="/add" exact activeClassName="active" activeStyle={{ color: '#7cc6fe', backgroundColor: 'pink' }}>Add todo</NavLink>
        </nav>
    )
}
