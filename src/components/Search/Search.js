import React, { useState, useEffect, useRef } from 'react';

import './Search.scss';

const Search = React.memo(({ onLoadCountryFilter, countryList, setUpdatedCountryData }) => {
	// const { onLoadCountryFilter, countryList } = props;
	const [enteredFilter, setEnteredFilter] = useState('');
	const inputRef = useRef();

	const firstLetterTpUppercase = (cntryName) => {
		let updatedName;
		if (cntryName) {
			updatedName = cntryName.charAt(0).toUpperCase() + cntryName.slice(1);
		}
		console.log(updatedName);
		return updatedName;
	};

	useEffect(() => {
		let searchedCountry;
		const onUpdate = (event) => {
			setUpdatedCountryData(event);
		};

		const timer = setTimeout(() => {
			if (enteredFilter === inputRef.current.value) {
				const newEnteredFilter = enteredFilter.toLowerCase();

				try {
					const countriesAdjusted = countryList.map((item) => {
						const adjC = {
							country: item.country.toLowerCase(),
							countryId: item.countryId
						};
						return adjC;
					});

					searchedCountry = countriesAdjusted.filter((el) => el.country === newEnteredFilter);
				} catch (err) {
					return err;
				}
			}

			if (searchedCountry.length !== 0) {
				searchedCountry[0].country = firstLetterTpUppercase(searchedCountry[0].country);
			}

			return onUpdate(searchedCountry);
		}, 500);

		// cleaning up effect
		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadCountryFilter, inputRef, countryList, setUpdatedCountryData]);

	return (
		<div className="search-input">
			<h3>Search country</h3>
			<input
				placeholder="Enter country name..."
				ref={inputRef}
				type="text"
				value={enteredFilter}
				onChange={(event) => setEnteredFilter(event.target.value)}
			/>
		</div>
	);
});

export default Search;
