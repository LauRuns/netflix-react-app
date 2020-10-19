import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../../../components/Logo/Logo';
import './Navbar.css';

const Navbar = props => {
    return (
        <header className="Navbar">
            <div className="NavbarLogo">
                <Logo />
            </div>
            <nav className="DesktopOnly">
                <NavItems />
            </nav>
        </header>
    )
}

export default Navbar
