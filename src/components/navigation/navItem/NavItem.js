import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavItem.scss';

/*
Single NavItem
Takes in a link property to set its path
Returns children that are passed in
*/
export const NavItem = ({ link, children }) => {
	return (
		<li className="NavItem">
			<NavLink to={link} exact activeClassName="active">
				{children}
			</NavLink>
		</li>
	);
};
