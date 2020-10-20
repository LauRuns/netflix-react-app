import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.css';


const navItem = (props) => {

    return (
        <li className="NavItem">
            <NavLink
                to={props.link}
                exact
                activeClassName="active"
            >{props.children}</NavLink>
        </li>
    );
};



export default navItem;

