import React from 'react';

import Country from './Country/Country';
import Card from '../../shared/components/UIElements/Card/Card';
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
			<h2 className="CountryList-title">This app has Netflix data available for {props.items.length} countries.</h2>
			<ul className="CountryList">
				{props.items.map((country) => {
					return <Country key={country.countryId} country={country.country} />;
				})}
			</ul>
		</React.Fragment>

	);
};

export default CountryList;
