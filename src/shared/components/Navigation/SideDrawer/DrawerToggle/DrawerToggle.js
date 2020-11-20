import React from 'react';

import './DrawerToggle.scss';

const drawerToggle = (props) => {
	return (
		<div className="menu-container" onClick={props.clicked}>
			<div id="menu" />
		</div>
	);
};

export default drawerToggle;
