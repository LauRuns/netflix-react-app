import React from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Chip from '../../shared/components/UIElements/Chip/Chip';
import './CountryList.scss';

const CountryList = ({ items, onItemClicked }) => {
	if (items.length === 0) {
		return (
			<div>
				<Card>
					<h2>No countries found</h2>
				</Card>
			</div>
		);
	}

	const registerClickHandler = (e) => {
		onItemClicked(e);
	};

	return (
		<React.Fragment>
			<ul className="CountryList">
				{items.map(({ country, countryId }) => {
					return (
						<Chip
							key={countryId}
							name={country}
							onClick={() => registerClickHandler({ countryId: countryId, name: country })}
						/>
					);
				})}
			</ul>
		</React.Fragment>
	);
};

export default CountryList;
