import React from 'react';

import './DrawerToggle.scss';

export const DrawerToggle = (props) => {
	return (
		<div className="menu-container" onClick={props.clicked}>
			<div id="menu" />
		</div>
	);
};
