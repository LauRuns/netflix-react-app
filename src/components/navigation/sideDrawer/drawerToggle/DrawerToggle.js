import React from 'react';
import './DrawerToggle.scss';
/* Displays the hamburger menu item and forwards the onClick for openening the drawer */
export const DrawerToggle = (props) => {
	return (
		<div className="menu-container" onClick={props.clicked}>
			<div id="menu" />
		</div>
	);
};
