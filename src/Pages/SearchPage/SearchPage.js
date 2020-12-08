import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';
import { Header } from '../../components/atoms';
import { SearchForm } from '../../components/organisms';
import { ErrorModal, LoadingSpinner } from '../../components/uiElements';

// remove after development
import {
	testCountryList
	// testSearchResults,
	// singleSearchResult,
	// multipleSearchResult
} from '../../assets/testitems';

import './SearchPage.scss';

export const SearchPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { token } = useAuthentication();
	const isMounted = useRef(null);

	const [countryList, setCountryList] = useState();

	const history = useHistory();

	useEffect(() => {
		isMounted.current = true;
		setCountryList(testCountryList); // <-- dev
		// setSearchResults(testSearchResults);
		// setSearchResults(singleSearchResult);
		// setSearchResults(multipleSearchResult);

		const loadCountries = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
				);
				const { results } = responseData;
				console.log('Loaded country data____:', results);
				if (isMounted.current) {
					setCountryList(results);
				}
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};

		// loadCountries();
		return () => {
			isMounted.current = false;
		};
	}, []);

	const fetchSearchResults = ({ contentselector, countryselect, endyear, startyear, query }) => {
		history.push({
			pathname: '/search/results',
			search: `?title=${query}&start_year=${startyear}&end_year=${endyear}&content_type=${contentselector}&country=${countryselect}`
		});
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay loadingSpinnerMessage="Fetching countrylist..." />}
			<div className="search-page-container">
				<div id="search-page-header" className="search-page__header">
					<Header lg center>
						<h2>Search the Netflix unogsNG database!</h2>
					</Header>
				</div>
				<div id="search-page-form" className="search-page__form">
					<SearchForm countries={countryList} sendFormData={fetchSearchResults} />
				</div>
			</div>
		</React.Fragment>
	);
};
