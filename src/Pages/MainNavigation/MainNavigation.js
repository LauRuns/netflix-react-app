import React, { useState, useContext } from 'react';

import Navbar from '../../shared/components/Navigation/Navbar/Navbar';
import SideDrawer from '../../shared/components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../shared/components/UIElements/Backdrop/Backdrop';
import { AuthContext } from '../../shared/context/auth-context';

import './MainNavigation.scss';

const MainNavigation = (props) => {
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

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
			<Navbar
				navItemsList={navItemsList}
				drawerToggleClicked={openDrawerHandler}
				onLogout={logOut}
				drawerIsOpen={drawerIsOpen}
			/>
			<SideDrawer open={drawerIsOpen} navItemClicked={closeDrawerHandler} />
		</React.Fragment>
	);
};

export default MainNavigation;
