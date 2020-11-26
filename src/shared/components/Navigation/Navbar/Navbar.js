import React from 'react';

import NavItems from '../NavItems/NavItems';
import Logo from '../../../../components/Logo/Logo';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';
import './Navbar.scss';

const navItemsList = [
	{
		linkTo: '/home',
		linkName: 'Home'
	},
	{
		linkTo: '/countries',
		linkName: 'Countries'
	},
	{
		linkTo: '/search',
		linkName: 'Search'
	},
	{
		linkTo: '/account',
		linkName: 'Account'
	}
];

const Navbar = (props) => {
	return (
		<header className="Navbar">
			<div className="NavbarLogo">
				<Logo />
			</div>
			<nav className="DesktopOnly">
				<NavItems navItemsList={navItemsList} />
			</nav>
			<menu className="MobileOnly">
				<DrawerToggle clicked={props.drawerToggleClicked} />
			</menu>
		</header>
	);
};

export default Navbar;
