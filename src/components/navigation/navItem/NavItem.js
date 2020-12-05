import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.scss';

export const NavItem = ({ link, children }) => {
	return (
		<li className="NavItem">
			<NavLink to={link} exact activeClassName="active">
				{children}
			</NavLink>
		</li>
	);
};
