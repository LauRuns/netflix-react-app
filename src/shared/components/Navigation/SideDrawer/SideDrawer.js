import React, { useContext } from 'react';

import Logo from '../../../../components/Logo/Logo';
import { AuthContext } from '../../../context/auth-context';
import Button from '../../UIElements/Button/Button';
import { IconNavItems } from '../../Navigation/iconNavItems/IconNavItems';

import './SideDrawer.scss';

export const SideDrawer = ({ open, navItemClicked, navItems, isLoggedIn, onLogout }) => {
	const auth = useContext(AuthContext);

	let attachClasses = ['SideDrawer', 'Open', 'Close'];

	if (open) {
		attachClasses = ['SideDrawer', 'Open'];
	}
	console.log(navItems);

	return (
		<React.Fragment>
			<div className={attachClasses.join(' ')}>
				<div className="Sidedrawerlogo">
					<Logo />
				</div>
				<nav onClick={navItemClicked}>
					<IconNavItems drawerIsOpen={open} navItems={navItems} />
					{isLoggedIn && <Button onClick={onLogout}>LOGOUT</Button>}
				</nav>
			</div>
		</React.Fragment>
	);
};
