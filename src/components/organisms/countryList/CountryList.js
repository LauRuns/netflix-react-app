import React from 'react';

import { Chip, Card } from '../../uiElements';
import './CountryList.scss';

export const CountryList = ({ items, onItemClicked }) => {
	if (items.length === 0) {
		return (
			<Card>
				<h2>No countries found</h2>
			</Card>
		);
	}

	return (
		<React.Fragment>
			<ul className="CountryList">
				{items.map(({ country, countryId }) => {
					return <Chip key={countryId} name={country} countryId={countryId} />;
				})}
			</ul>
		</React.Fragment>
	);
};
