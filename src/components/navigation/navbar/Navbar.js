import React from 'react';

import { NavItems } from '../navItems/NavItems';
import { DrawerToggle } from '../sideDrawer/drawerToggle/DrawerToggle';
import { Tooltip } from '../../uiElements';
import { Icon, Logo } from '../../../components/atoms';
import NetflixHexagon from '../../../assets/netflix_hexagon.png';
import './Navbar.scss';

export const Navbar = ({
	navItemsList,
	onLogout,
	drawerToggleClicked,
	isLoggedIn,
	onLogoNavigate
}) => {
	return (
		<header className="Navbar">
			<Logo logoSource={NetflixHexagon} altLogo="Hexagon" size={32} onClick={onLogoNavigate} />
			<nav className="DesktopOnly">
				<NavItems navItemsList={navItemsList} isAuthenticated={isLoggedIn} />
				{isLoggedIn && (
					<Tooltip direction="bottom" message="Logout">
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
