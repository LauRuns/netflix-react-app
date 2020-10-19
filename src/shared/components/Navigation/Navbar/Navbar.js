import React from 'react';

import NavItems from '../NavItems/NavItems';
import './Navbar.css';

const Navbar = props => {
    return (
        <header className="Navbar">
            <nav className="DesktopOnly">
                <NavItems />
            </nav>
        </header>
    )
}

export default Navbar
