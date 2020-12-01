import React, { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import { Header } from '../../shared/components/UIElements/header/Header';
import { SearchForm } from '../../components/organisms/searchForm/SearchForm';

import './SearchPage.scss';

// remove when done with development
const testcountries = [
	{ country: 'Argentina', countryId: 21 },
	{ country: 'Australia', countryId: 23 },
	{ country: 'Belgium', countryId: 26 },
	{ country: 'Brazil', countryId: 29 },
	{ country: 'Canada', countryId: 33 },
	{ country: 'Switzerland', countryId: 34 },
	{ country: 'Germany', countryId: 39 },
	{ country: 'France', countryId: 45 },
	{ country: 'United Kingdom', countryId: 46 },
	{ country: 'Mexico', countryId: 65 },
	{ country: 'Netherlands', countryId: 67 },
	{ country: 'Sweden', countryId: 73 },
	{ country: 'United States', countryId: 78 },
	{ country: 'Iceland', countryId: 265 },
	{ country: 'Japan', countryId: 267 },
	{ country: 'Portugal', countryId: 268 },
	{ country: 'Italy', countryId: 269 },
	{ country: 'Spain', countryId: 270 },
	{ country: 'Czech Republic', countryId: 307 },
	{ country: 'Greece', countryId: 327 },
	{ country: 'Hong Kong', countryId: 331 },
	{ country: 'Hungary', countryId: 334 },
	{ country: 'Israel', countryId: 336 },
	{ country: 'India', countryId: 337 },
	{ country: 'South Korea', countryId: 348 },
	{ country: 'Lithuania', countryId: 357 },
	{ country: 'Poland', countryId: 392 },
	{ country: 'Romania', countryId: 400 },
	{ country: 'Russia', countryId: 402 },
	{ country: 'Singapore', countryId: 408 },
	{ country: 'Slovakia', countryId: 412 },
	{ country: 'Thailand', countryId: 425 },
	{ country: 'Turkey', countryId: 432 },
	{ country: 'South Africa', countryId: 447 }
];

const SearchPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [countryList, setCountryList] = useState();
	const [searchResults, setSearchResults] = useState();

	const loadCountries = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
			);
			const { results, count } = responseData;
			console.log('Loaded country data____:', results);
			// console.log('Nr of loaded countries:____:', count);
			setCountryList(results);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	useEffect(() => {
		setCountryList(testcountries);
		// loadCountries();
	}, [sendRequest]);

	const searchFormSubmitHandler = async (event) => {
		console.log('EVENT__DATA____:', event);
		const { contentselector, countryselect, endyear, startyear, query } = event;

		try {
			const searchResponseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search`,
				'POST',
				JSON.stringify({
					query: query,
					countrylist: countryselect,
					start_year: startyear,
					end_year: endyear,
					type: contentselector
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			const { results, count } = searchResponseData;
			console.log('Search resonse count____:', count);
			console.log('Search response results____:', results);
			setSearchResults(results);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="search-page-container">
				<div id="search-page-header" className="search-page__header">
					<Header lg center>
						<h2>Search the Netflix unogsNG database!</h2>
					</Header>
				</div>
				<div id="search-page-form" className="search-page__form">
					<SearchForm countries={countryList} sendFormData={searchFormSubmitHandler} />
				</div>
				<div id="search-page-reults" className="search-page__results">
					<h2>Results go here</h2>
					{isLoading && <LoadingSpinner center loadingSpinnerMessage="Bussy fetching data..." />}
					{!isLoading && searchResults && <h2>We have search results!</h2>}
				</div>
			</div>
		</React.Fragment>
	);
};

export default SearchPage;
