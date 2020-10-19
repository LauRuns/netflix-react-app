import React from 'react';

import NavItem from './NavItem/NavItem';
import './NavItems.css';


const navItems = (props) => {
    return (
        <ul className="NavigationItems">
            <NavItem link="/" >Countries</NavItem>
            <NavItem link="/account" >MyAccount</NavItem>
        </ul>
    );
};



export default navItems;
