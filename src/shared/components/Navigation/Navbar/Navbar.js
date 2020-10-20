import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../../../components/Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
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
            <menu className="MobileOnly">
                <DrawerToggle clicked={props.drawerToggleClicked} />
            </menu>
        </header>
    )
}

export default Navbar
