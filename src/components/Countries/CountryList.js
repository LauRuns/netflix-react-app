import React from 'react';

import Country from './Country/Country';
import Card from '../../shared/components/UIElements/Card/Card';
import Chip from '../../shared/components/UIElements/Chip/Chip';
import './CountryList.css';

const CountryList = (props) => {
	if (props.items.length === 0) {
		return (
			<div>
				<Card>
					<h2>No countries found</h2>
				</Card>
			</div>
		);
	}

	return (
		<React.Fragment>
			<ul className="CountryList">
				{props.items.map((country) => {
					// return <Country key={country.countryId} country={country.country} />;
					return <Chip key={country.countryId} name={country.country} />;
				})}
			</ul>
		</React.Fragment>
	);
};

export default CountryList;
