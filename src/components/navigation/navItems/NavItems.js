import React from 'react';
import { NavItem } from '../navItem/NavItem';
import './NavItems.scss';

/*
Renders a list of NavItems in the navbar.
Takes in a list of items to show and a prop to check the authentication status.
*/
export const NavItems = ({ navItemsList, isAuthenticated }) => {
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
