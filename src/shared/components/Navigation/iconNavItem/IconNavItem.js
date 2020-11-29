import React from 'react';
import { NavLink } from 'react-router-dom';

import { Icon } from '../../../../components/Icon/Icon';

import './IconNavItem.scss';

export const IconNavItem = ({
	children,
	link,
	iconName,
	iconSize,
	iconColor,
	iconStyle,
	textSize
}) => {
	const defaultNavItemStyle = {
		color: '#fff',
		fontSize: 'medium'
	};
	const styles = { ...defaultNavItemStyle, ...textSize };

	return (
		<div className="icon-nav-item" style={styles}>
			<NavLink to={link} exact activeClassName="active">
				<Icon icon={iconName} size={iconSize} color={iconColor} style={iconStyle} />
				{children}
			</NavLink>
		</div>
	);
};
