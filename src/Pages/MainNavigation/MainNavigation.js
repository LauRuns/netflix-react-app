import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
/* Hook and context */
import { useContextUser } from '../../shared/context/user-context';
import { useAuthState } from '../../shared/context/auth-context';
/* UI elements and components */
import { Navbar, SideDrawer } from '../../components/navigation';
import { Backdrop } from '../../components/uiElements';

/*
Holds the navigation components for the application.
When screen size is reduced to x width, the sidedrawer is used for navigating the app.
*/
export const MainNavigation = () => {
	const { isAuthenticated, userId, logout } = useAuthState();
	const { countryData, clearActiveUserHandler } = useContextUser();
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);
	const history = useHistory();

	/* Opens and closes the sidedrawer by pressing the menu icon in the top right */
	const openDrawerHandler = () => setDrawerIsOpen(true);
	const closeDrawerHandler = () => setDrawerIsOpen(!drawerIsOpen);

	/* Logs the user out from the app. Calls the logout() and clearActiveUserHandler() function in the auth context and user context. Navigates back to the /login screen */
	const logOut = () => {
		logout();
		clearActiveUserHandler();
		history.push('/login');
	};
	/* Enabled navigation when the logo in the top left of the screen is pressed/clicked. Navigates to the home screen. */
	const navigateOnLogo = () =>
		history.push(`/home/${countryData?.countryId}/${countryData?.country}`);

	const defaultNavStyling = {
		iconSize: 32,
		iconColor: '#fff',
		iconStyle: { marginRight: '1rem' },
		textSize: { fontSize: 'larger' }
	};

	const navItemsList = [
		{
			linkTo: `/home/${countryData?.countryId}/${countryData?.country}`,
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
