import React from 'react';
import { Link } from 'react-router-dom';

import './Chip.scss';

export const Chip = ({ name, countryId }) => {
	return (
		<div className="chip-container">
			<Link to={`/countryinfo/${countryId}/${name}`}>{name}</Link>
		</div>
	);
};
