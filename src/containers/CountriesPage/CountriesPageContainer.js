import React, { useEffect, useState } from 'react';

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
				<div id="search-item">
					<Search />
				</div>
				<div id="cntry-list-item">{loadedCountries && <CountryList items={loadedCountries} />}</div>
			</div>
		</React.Fragment>
	);
};

export default CountriesPageContainer;
