
import React from 'react';
import { NavLink } from 'react-router-dom';

import './TodoNavigation.css';

export default () => {
    return (
        <nav className="TodoNavigation" >
            <NavLink exact activeStyle={{
                fontWeight: "bold",
                color: "white", backgroundColor: 'black', backgroundImage: "initial"
            }} to="/work"  >Work</NavLink>
            <NavLink exact activeStyle={{
                fontWeight: "bold",
                color: "white", backgroundColor: 'black', backgroundImage: "initial"
            }} to="/private"  >Private</NavLink>
            <NavLink exact activeStyle={{
                fontWeight: "bold",
                color: "white", backgroundColor: 'black', backgroundImage: "initial"
            }} to="/add" >Add todo</NavLink>

        </nav>
    )
}