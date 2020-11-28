import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.scss';

const navItem = ({ link, children }) => {
	return (
		<li className="NavItem">
			<NavLink to={link} exact activeClassName="active">
				{children}
			</NavLink>
		</li>
	);
};

export default navItem;
