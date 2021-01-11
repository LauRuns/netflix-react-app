import React from 'react';
/* Hook - context */
import { useAuthentication } from '../../../shared/hooks/authentication-hook';
/* Component and styling */
import { IconNavItem } from '../iconNavItem/IconNavItem';
import './IconNavItems.scss';

/* Returns a list of IconNavItem for using in the SideDrawer */
export const IconNavItems = ({ navItems }) => {
	const { isAuthenticated } = useAuthentication();

	return (
		<ul className="icon-nav-items-container">
			{isAuthenticated &&
				navItems &&
				navItems.map(({ linkTo, linkName, iconName, iconSize, iconColor, iconStyle, textSize }) => {
					return (
						<li key={linkName}>
							<IconNavItem
								link={linkTo}
								iconName={iconName}
								iconSize={iconSize}
								iconColor={iconColor}
								iconStyle={iconStyle}
								textSize={textSize}
							>
								{linkName}
							</IconNavItem>
						</li>
					);
				})}
		</ul>
	);
};
