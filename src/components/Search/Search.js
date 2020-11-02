import React, { useState, useEffect, useRef } from 'react';

import './Search.css';

const Search = React.memo((props) => {
	const { onLoadCountryFilter, countryList } = props;
	const [enteredFilter, setEnteredFilter] = useState('');
	const inputRef = useRef();

	useEffect(() => {
		let searchedCountry;
		const onUpdate = (event) => {
			props.setUpdatedCountryData(event);
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
			return onUpdate(searchedCountry);
		}, 500);

		// cleaning up effect
		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadCountryFilter, inputRef, countryList]);

	return (
		<section className="search">
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
		</section>
	);
});

export default Search;
