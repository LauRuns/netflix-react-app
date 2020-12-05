import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { AuthContext } from '../../shared/context/auth-context';
import { Navbar, SideDrawer } from '../../components/navigation';
import { Backdrop } from '../../components/uiElements';

import './MainNavigation.scss';

export const MainNavigation = () => {
	const auth = useContext(AuthContext);
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const history = useHistory();

	const openDrawerHandler = () => setDrawerIsOpen(true);
	const closeDrawerHandler = () => setDrawerIsOpen(!drawerIsOpen);

	const logOut = () => auth.logout();
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
			linkTo: '/account',
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
				isLoggedIn={auth.isLoggedIn}
				onLogoNavigate={navigateOnLogo}
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
