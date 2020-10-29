import React, { useState } from 'react';

import Button from '../../../shared/components/UIElements/Button/Button';
import './CountrySetter.css';

const CountrySetter = (props) => {
	const [selectedCountry, setSelectedCountry] = useState(undefined);

	if (!props.countryData) {
		return (
			<div>
				<h2>Loading country data...</h2>
			</div>
		);
	}

	const countryList = props.countryData;

	const countrySelectHandler = (e) => {
		setSelectedCountry(e.target.value);
	};

	const selectList = (
		<select id="countrySelector" onChange={countrySelectHandler}>
			{countryList.map((country) => (
				<option key={country.countryId}>{country.country}</option>
			))}
		</select>
	);

	return (
		<div className="country-set-container">
			<form className="set-country-form">
				<div className="country-dsply-info">
					<p>
						Set your country. The next time you log in it will load Netflix data based on your
						selected country.
					</p>
				</div>
				<div className="country-select">{selectList}</div>
				<div className="check-save">
					<p>
						{selectedCountry
							? `Save ${selectedCountry} as your new default country?`
							: 'No country selected'}
					</p>
					<Button disabled={!selectedCountry} type="submit">
						SAVE COUNTRY
					</Button>
				</div>
			</form>
		</div>
	);
};

export default CountrySetter;
