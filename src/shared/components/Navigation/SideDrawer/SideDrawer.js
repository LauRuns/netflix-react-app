import React from 'react';

import { Logo } from '../../../../components/Logo/Logo';
import { IconNavItems } from '../../Navigation/iconNavItems/IconNavItems';
import NetflixHexagon from '../../../../assets/netflix_hexagon.png';
import { IconButton } from '../../UIElements/iconButton/IconButton';

import './SideDrawer.scss';

export const SideDrawer = ({ open, navItemClicked, navItems, isLoggedIn, onLogout }) => {
	let attachClasses = ['SideDrawer', 'Open', 'Close'];

	if (open) {
		attachClasses = ['SideDrawer', 'Open'];
	}

	return (
		<React.Fragment>
			<div className={attachClasses.join(' ')}>
				<div className="side-drawer-logo">
					<Logo logoSource={NetflixHexagon} altLogo="Hexagon" size={64} />
				</div>
				<nav onClick={navItemClicked}>
					<IconNavItems drawerIsOpen={open} navItems={navItems} />
					{isLoggedIn && (
						<IconButton
							icon="exitApp"
							iconSize={32}
							iconColor="#fff"
							onClick={onLogout}
							iconStyle={{ marginLeft: '1.5rem' }}
						>
							LOGOUT
						</IconButton>
					)}
				</nav>
			</div>
		</React.Fragment>
	);
};
