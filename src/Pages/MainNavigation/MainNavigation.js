import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Navbar, SideDrawer } from '../../components/navigation';
import { Backdrop } from '../../components/uiElements';
import { useAuthentication } from '../../shared/hooks/authentication-hook';
import './MainNavigation.scss';

export const MainNavigation = () => {
	const { isAuthenticated, userId, logout } = useAuthentication();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	console.log('Mainnavigation__isAuthenticated__?__', isAuthenticated);

	const history = useHistory();

	const openDrawerHandler = () => setDrawerIsOpen(true);
	const closeDrawerHandler = () => setDrawerIsOpen(!drawerIsOpen);

	const logOut = () => {
		logout();
		history.push('/login');
	};
	const navigateOnLogo = () => history.push('/home');

	const defaultNavStyling = {
		iconSize: 32,
		iconColor: '#fff',
		iconStyle: { marginRight: '1rem' },
		textSize: { fontSize: 'larger' }
	};

	const navItemsList = [
		{
			linkTo: '/home',
			linkName: 'Home',
			iconName: 'home',
			...defaultNavStyling
		},
		{
			linkTo: '/countries',
			linkName: 'Countries',
			iconName: 'marker',
			...defaultNavStyling
		},
		{
			linkTo: '/search',
			linkName: 'Search',
			iconName: 'search',
			...defaultNavStyling
		},
		{
			linkTo: `/account/${userId}`,
			linkName: 'Account',
			iconName: 'account',
			...defaultNavStyling
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
				isLoggedIn={isAuthenticated}
				onLogoNavigate={navigateOnLogo}
			/>
			<SideDrawer
				open={drawerIsOpen}
				navItemClicked={closeDrawerHandler}
				navItems={navItemsList}
				isLoggedIn={isAuthenticated}
				onLogout={logOut}
			/>
		</React.Fragment>
	);
};
