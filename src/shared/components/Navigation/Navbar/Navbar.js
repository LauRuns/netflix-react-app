import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../../../components/Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { Icon } from '../../../../components/Icon/Icon';
import './Navbar.scss';

const Navbar = (props) => {
	return (
		<header className="Navbar">
			<div className="NavbarLogo">
				<Logo />
			</div>
			<nav className="DesktopOnly">
				<NavItems navItemsList={props.navItemsList} />
				<Icon icon="exitApp" size={32} color="#fff" onClick={props.onLogout} />
			</nav>
			<menu className="MobileOnly">
				<DrawerToggle clicked={props.drawerToggleClicked} />
			</menu>
		</header>
	);
};

export default Navbar;
