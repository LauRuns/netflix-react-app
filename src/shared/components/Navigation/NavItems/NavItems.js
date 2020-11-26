// /* eslint-disable jsx-a11y/interactive-supports-focus */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';

import { AuthContext } from '../../../context/auth-context';
import NavItem from './NavItem/NavItem';
import { Tooltip } from '../../UIElements/Tooltip/Tooltip';

import './NavItems.scss';
import LogoutLogo from '../../../../assets/log-out.svg';

const NavItems = ({ drawerIsOpen, navItemsList }) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="navigation-items-list">
			{!auth.isLoggedIn && <NavItem link="/auth">Login</NavItem>}
			{auth.isLoggedIn &&
				navItemsList &&
				navItemsList.map(({ linkTo, linkName }) => {
					return (
						<NavItem key={linkName} link={linkTo}>
							{linkName}
						</NavItem>
					);
				})}

			{auth.isLoggedIn &&
				(drawerIsOpen ? (
					<div onClick={auth.logout}>
						<hr />
						<strong>
							<p>Logout</p>
						</strong>
					</div>
				) : (
					<div id="logout-icon-btn" className="logout-icon" onClick={auth.logout}>
						<Tooltip direction="bottom" message="Logout, bye!" delay={100}>
							<img src={LogoutLogo} alt="Logout icon" />
						</Tooltip>
					</div>
				))}
		</ul>
	);
};

export default NavItems;
