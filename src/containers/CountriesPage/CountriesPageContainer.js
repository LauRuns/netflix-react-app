import React, { useEffect, useState, useCallback } from 'react';

import CountryList from '../../components/Countries/CountryList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import Search from '../../components/Search/Search';

import './CountriesPageContainer.css';

const CountriesPageContainer = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedCountries, setLoadedCountries] = useState();

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
				);
				setLoadedCountries(responseData.results);
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};
		fetchCountries();
	}, [sendRequest]);

	const filteredCountriesHandler = (filteredCountries) => {
		// dispatch({ type: 'SET', ingredients: filteredIngredients });

		if (filteredCountries.length !== 0) {
			console.log('filteredCountriesHandler', filteredCountries);
			setLoadedCountries(filteredCountries);
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && (
				<div className="center">
					<LoadingSpinner />
				</div>
			)}
			<div className="cntry-pages-container">
				{loadedCountries && (
					<div id="title-item">
						<h3>There is Netflix data for {loadedCountries.length} countries available!</h3>
					</div>
				)}
				{loadedCountries ? (
					<div id="search-item">
						<Search
							countryList={loadedCountries}
							// onLoadCountryFilter={() => filteredCountriesHandler()}
							setUpdatedCountryData={filteredCountriesHandler}
						/>
					</div>
				) : (
					<h2 id="alt-search">Loading data...</h2>
				)}
				<div id="cntry-list-item">{loadedCountries && <CountryList items={loadedCountries} />}</div>
			</div>
		</React.Fragment>
	);
};

export default CountriesPageContainer;
