import React, { useState } from 'react';

import Navbar from '../../shared/components/Navigation/Navbar/Navbar';
import SideDrawer from '../../shared/components/Navigation/SideDrawer/SideDrawer';
import Backdrop from '../../shared/components/UIElements/Backdrop/Backdrop';
import './MainNavigation.scss';

const MainNavigation = (props) => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const openDrawerHandler = () => {
		setDrawerIsOpen(true);
	};

	const closeDrawerHandler = () => {
		setDrawerIsOpen(!drawerIsOpen);
	};

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
			<Navbar drawerToggleClicked={openDrawerHandler} />
			<SideDrawer open={drawerIsOpen} navItemClicked={closeDrawerHandler} />
		</React.Fragment>
	);
};

export default MainNavigation;
