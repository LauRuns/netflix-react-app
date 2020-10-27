import React from 'react';
import { NavLink } from 'react-router-dom';

import './Logo.css';
import NetflixLogo from '../../assets/netflix_hexagon.png';

const logo = (props) => {
	return (
		<div className="Logo">
			<NavLink
				to="/"
				exact
			>
				<img src={NetflixLogo} alt="Netflix-logo" />
			</NavLink>
		</div>
	);
};

export default logo;
