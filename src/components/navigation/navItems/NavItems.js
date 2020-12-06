import React from 'react';
import { NavItem } from '../navItem/NavItem';
import { useAuthentication } from '../../../shared/hooks/authentication-hook';

import './NavItems.scss';

export const NavItems = ({ navItemsList }) => {
	const { isAuthenticated } = useAuthentication();

	return (
		<ul className="navigation-items-list">
			{!isAuthenticated && <NavItem link="/login">Login</NavItem>}
			{isAuthenticated &&
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
