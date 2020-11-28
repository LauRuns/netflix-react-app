import React, { useState, useContext } from 'react';

import Navbar from '../../shared/components/Navigation/Navbar/Navbar';
import { SideDrawer } from '../../shared/components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../shared/components/UIElements/Backdrop/Backdrop';
import { AuthContext } from '../../shared/context/auth-context';

import './MainNavigation.scss';

const MainNavigation = () => {
	const auth = useContext(AuthContext);
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawerHandler = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawerHandler = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};

	const logOut = () => {
		auth.logout();
	};

	const navItemsList = [
		{
			linkTo: '/home',
			linkName: 'Home',
			iconName: 'home',
			iconSize: 32,
			iconColor: '#fff'
		},
		{
			linkTo: '/countries',
			linkName: 'Countries',
			iconName: 'marker',
			iconSize: 32,
			iconColor: '#fff'
		},
		{
			linkTo: '/search',
			linkName: 'Search',
			iconName: 'search',
			iconSize: 32,
			iconColor: '#fff'
		},
		{
			linkTo: '/account',
			linkName: 'Account',
			iconName: 'account',
			iconSize: 32,
			iconColor: '#fff'
		}
	];

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
			<Navbar
				navItemsList={navItemsList}
				drawerToggleClicked={openDrawerHandler}
				onLogout={logOut}
				drawerIsOpen={drawerIsOpen}
				isLoggedIn={auth.isLoggedIn}
			/>
			<SideDrawer
				open={drawerIsOpen}
				navItemClicked={closeDrawerHandler}
				navItems={navItemsList}
				isLoggedIn={auth.isLoggedIn}
				onLogout={logOut}
			/>
		</React.Fragment>
	);
};

export default MainNavigation;
