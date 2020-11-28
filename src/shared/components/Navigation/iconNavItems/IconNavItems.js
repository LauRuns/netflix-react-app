import React, { useContext } from 'react';

import { AuthContext } from '../../../context/auth-context';
import { IconNavItem } from '../iconNavItem/IconNavItem';

import './IconNavItems.scss';

export const IconNavItems = ({ navItems }) => {
	const auth = useContext(AuthContext);
	return (
		<ul className="icon-nav-items-container">
			{auth.isLoggedIn &&
				navItems &&
				navItems.map(({ linkTo, linkName, iconName, iconSize, iconColor, iconStyle }) => {
					return (
						<IconNavItem
							key={linkName}
							link={linkTo}
							iconName={iconName}
							iconSize={iconSize}
							iconColor={iconColor}
							iconStyle={iconStyle}
						>
							{linkName}
						</IconNavItem>
					);
				})}
		</ul>
	);
};
