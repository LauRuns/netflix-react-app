import React, { useState, useEffect, useRef } from 'react';
/* Components and styling */
import { Icon } from '../../atoms';
import './Search.scss';

/*
Returns a search field used in the CountriesPage for searching the list of countries.
*/
export const Search = React.memo(({ onLoadCountryFilter, countryList, setUpdatedCountryData }) => {
	const [enteredFilter, setEnteredFilter] = useState('');
	const inputRef = useRef();

	/*
    Sets the first letter of the searched country to uppercase to match the countries in the list - which also start with an uppercase.
    Otherwise no country search would match the search query
    */
	const firstLetterToUppercase = (cntryName) => {
		let updatedName;
		if (cntryName) {
			updatedName = cntryName.charAt(0).toUpperCase() + cntryName.slice(1);
		}
		return updatedName;
	};

	useEffect(() => {
		let searchedCountry;
		/* Forwards the search reult to the CountriesPage */
		const onUpdate = (event) => {
			setUpdatedCountryData(event);
		};

		/* Uses a timeout of 500ms - when the user stops typing a search of the list is performed */
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
				searchedCountry[0].country = firstLetterToUppercase(searchedCountry[0].country);
			}

			return onUpdate(searchedCountry);
		}, 500);

		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadCountryFilter, inputRef, countryList, setUpdatedCountryData]);

	return (
		<div className="search-input">
			<div>
				<Icon icon="search" size={24} />
				<h3>Search country</h3>
			</div>
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
