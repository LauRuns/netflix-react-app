import React from 'react';

import Logo from '../../../../components/Logo/Logo';
import NavItems from '../NavItems/NavItems';

import './SideDrawer.css';

const sideDrawer = (props) => {
	let attachClasses = ['SideDrawer', 'Open', 'Close'];

	if (props.open) {
		attachClasses = ['SideDrawer', 'Open'];
	}

	return (
		<React.Fragment>
			<div className={attachClasses.join(' ')}>
				<div className="Sidedrawerlogo">
					<Logo />
				</div>
				<nav onClick={props.navItemClicked}>
					<NavItems drawerIsOpen={props.open} />
				</nav>
			</div>
		</React.Fragment>
	);
};

export default sideDrawer;
