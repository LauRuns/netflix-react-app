import React, { useState } from 'react';

import Button from '../../../shared/components/UIElements/Button/Button';
import './CountrySetter.css';

const CountrySetter = (props) => {
	const [selectedCountry, setSelectedCountry] = useState(undefined);
	const countryList = props.countryData.map((country) => country.country);

	const countrySelectHandler = (e) => {
		setSelectedCountry(e.target.value);
	};

	const selectList = (
		<select id="countrySelector" onChange={countrySelectHandler}>
			{countryList.map((countryName) => (
				<option key={countryName}>{countryName}</option>
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
