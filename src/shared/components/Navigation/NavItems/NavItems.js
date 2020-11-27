import React, { useContext } from 'react';

import { AuthContext } from '../../../context/auth-context';
import NavItem from './NavItem/NavItem';

import './NavItems.scss';

const NavItems = ({ drawerIsOpen, navItemsList }) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="navigation-items-list">
			{!auth.isLoggedIn && <NavItem link="/auth">Login</NavItem>}
			{auth.isLoggedIn &&
				navItemsList &&
				navItemsList.map(({ linkTo, linkName }) => {
					return (
						<NavItem key={linkName} link={linkTo}>
							{linkName}
						</NavItem>
					);
				})}
		</ul>
	);
};

export default NavItems;
