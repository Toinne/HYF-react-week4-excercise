import React from 'react';
import { Link } from 'react-router-dom';

import './TodoNavigation.css';

export default () => {
    return (
        <nav className="TodoNavigation">
            <Link to="/">Overview</Link>
            <Link to="/add">Add todo</Link>
        </nav>
    )
}