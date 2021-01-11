import React from 'react';
/* UI elements and components */
import { NavItems } from '../navItems/NavItems';
import { DrawerToggle } from '../sideDrawer/drawerToggle/DrawerToggle';
import { Tooltip } from '../../uiElements';
import { Icon, Logo } from '../../../components/atoms';
/* Styling and image logo */
import NetflixHexagon from '../../../assets/netflix_hexagon.png';
import './Navbar.scss';

/* Handles displaying the navbar components and forwarding all clicks */
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
			{isLoggedIn && (
				<menu className="MobileOnly">
					<DrawerToggle clicked={drawerToggleClicked} />
				</menu>
			)}
		</header>
	);
};
