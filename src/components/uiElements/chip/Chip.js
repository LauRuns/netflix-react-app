import React from 'react';
import { Link } from 'react-router-dom';
import './Chip.scss';

/*
Returns a 'chip' shaped container that holds a link.
This component is used in the CountriesPage to display a list of clickable chips.
*/
export const Chip = ({ name, countryId }) => {
	return (
		<div className="chip-container">
			<Link to={`/countryinfo/${countryId}/${name}`}>{name}</Link>
		</div>
	);
};
