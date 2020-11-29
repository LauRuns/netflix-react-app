import React from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Chip from '../../shared/components/UIElements/Chip/Chip';
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
					return (
						<Chip
							key={countryId}
							name={country}
							onClick={() => onItemClicked({ countryId: countryId, name: country })}
						/>
					);
				})}
			</ul>
		</React.Fragment>
	);
};
