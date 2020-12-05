import React, { useContext } from 'react';

import { AuthContext } from '../../../shared/context/auth-context';
import { NavItem } from '../navItem/NavItem';

import './NavItems.scss';

export const NavItems = ({ navItemsList }) => {
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
