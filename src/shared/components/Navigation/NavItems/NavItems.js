// /* eslint-disable jsx-a11y/interactive-supports-focus */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext } from 'react';

import { AuthContext } from '../../../context/auth-context';
import NavItem from './NavItem/NavItem';
// import Icon from '.././../../../components/Icon/Icon';
// import Tooltip from '../../UIElements/Tooltip/Tooltip';

import './NavItems.css';
import LogoutLogo from '../../../../assets/log-out.svg';

const NavItems = (props) => {
	const auth = useContext(AuthContext);

	return (
		<ul className="NavigationItems">
			{!auth.isLoggedIn && <NavItem link="/auth">Login</NavItem>}
			{auth.isLoggedIn && <NavItem link="/">Countries</NavItem>}
			{auth.isLoggedIn && <NavItem link="/account">MyAccount</NavItem>}
			{
				auth.isLoggedIn &&
					(props.drawerIsOpen ? (
						<div onClick={auth.logout}>
							<hr />
							<strong>
								<p>Logout</p>
							</strong>
						</div>
					) : (
						<div id="LogoutIcon" className="Icon" onClick={auth.logout} data-tooltip="Logout, bye!">
							<img src={LogoutLogo} alt="Logout icon" />
						</div>
					))
				// <Tooltip content="Please logout" direction="bottom">
				// </Tooltip>
			}
		</ul>
	);
};

export default NavItems;
