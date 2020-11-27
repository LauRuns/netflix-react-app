import React, { useContext } from 'react';

import Logo from '../../../../components/Logo/Logo';
import NavItems from '../NavItems/NavItems';
import { AuthContext } from '../../../context/auth-context';
import Button from '../../UIElements/Button/Button';

import './SideDrawer.scss';

export const SideDrawer = ({ open, navItemClicked, navItems, isLoggedIn, onLogout }) => {
	const auth = useContext(AuthContext);

	let attachClasses = ['SideDrawer', 'Open', 'Close'];

	if (open) {
		attachClasses = ['SideDrawer', 'Open'];
	}

	return (
		<React.Fragment>
			<div className={attachClasses.join(' ')}>
				<div className="Sidedrawerlogo">
					<Logo />
				</div>
				<nav onClick={navItemClicked}>
					<NavItems drawerIsOpen={open} navItemsList={navItems} />
					{isLoggedIn && <Button onClick={onLogout}>LOGOUT</Button>}
				</nav>
			</div>
		</React.Fragment>
	);
};
