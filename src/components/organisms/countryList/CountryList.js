import React from 'react';
import { Chip, Card } from '../../uiElements';
import './CountryList.scss';

/*
Returns a list of 'Chips' with country names.
Takes in a list of countries via props as 'items'.
*/
export const CountryList = ({ items }) => {
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
