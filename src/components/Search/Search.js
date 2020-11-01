import React, { useState, useEffect, useRef } from 'react';

import './Search.css';

const Search = React.memo((props) => {
	const { onLoadCountryFilter, countryList } = props;
	const [enteredFilter, setEnteredFilter] = useState('');
	const inputRef = useRef();

	let searchedCountry;

	useEffect(() => {
		const timer = setTimeout(() => {
			if (enteredFilter === inputRef.current.value) {
				const newEnteredFilter = enteredFilter.toLowerCase();
				console.log('enteredFilter', enteredFilter);
				console.log('newEnteredFilter', newEnteredFilter);

				try {
					const countriesAdjusted = countryList.map((item) => {
						const adjC = {
							country: item.country.toLowerCase(),
							countryId: item.countryId
						};
						return adjC;
					});

					searchedCountry = countriesAdjusted.filter((el) => el.country === newEnteredFilter);
					console.log('FIND result___::', searchedCountry);
				} catch (err) {
					console.log('ERROR filter in search___::', err);
				}

				onUpdate(searchedCountry);

				// const fetchIngredients = async () => {
				// 	try {
				// 		const query =
				// 			enteredFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${enteredFilter}"`;
				// 		const response = await fetch(
				// 			`https://react-hooks-416c0.firebaseio.com/ingredients.json${query}`
				// 		);
				// 		const responseData = await response.json();
				// 		const loadedIngredients = [];

				// 		for (const key in responseData) {
				// 			loadedIngredients.push({
				// 				id: key,
				// 				title: responseData[key].title,
				// 				amount: responseData[key].amount
				// 			});
				// 		}

				// 		onloadIngredients(loadedIngredients);
				// 	} catch (error) {
				// 		console.log(error);
				// 	}
				// };
				// fetchIngredients();
			}
		}, 1000);

		// cleaning up effect
		return () => {
			clearTimeout(timer);
		};
	}, [enteredFilter, onLoadCountryFilter, inputRef]);

	const onUpdate = (event) => {
		props.setUpdatedCountryData(event);
	};

	return (
		<section className="search">
			<div className="search-input">
				<label>Search country</label>
				<input
					placeholder="Enter country..."
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
