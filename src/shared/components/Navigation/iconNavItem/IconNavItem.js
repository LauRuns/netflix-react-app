import React from 'react';
import { NavLink } from 'react-router-dom';

import { Icon } from '../../../../components/Icon/Icon';

import './IconNavItem.scss';

export const IconNavItem = ({ children, link, iconName, iconSize, iconColor, iconStyle }) => {
	return (
		<li className="icon-nav-item">
			<NavLink to={link} exact activeClassName="active">
				<Icon icon={iconName} size={iconSize} color={iconColor} style={iconStyle} />
				{children}
			</NavLink>
		</li>
	);
};
