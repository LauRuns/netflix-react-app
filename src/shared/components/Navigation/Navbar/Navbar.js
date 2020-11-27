import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../../../components/Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import { Icon } from '../../../../components/Icon/Icon';
import { Tooltip } from '../../UIElements/Tooltip/Tooltip';
import './Navbar.scss';

const Navbar = ({ navItemsList, onLogout, drawerToggleClicked, isLoggedIn }) => {
	return (
		<header className="Navbar">
			<div className="NavbarLogo">
				<Logo />
			</div>
			<nav className="DesktopOnly">
				<NavItems navItemsList={navItemsList} />
				{isLoggedIn && (
					<Tooltip direction="bottom" delay={200} message="Logout">
						<div id="logout-icon-navbar">
							<Icon icon="exitApp" size={32} color="#fff" onClick={onLogout} />
						</div>
					</Tooltip>
				)}
			</nav>
			<menu className="MobileOnly">
				<DrawerToggle clicked={drawerToggleClicked} />
			</menu>
		</header>
	);
};

export default Navbar;
