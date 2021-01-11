import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
/* Hooks and context */
import { useNetflixClient } from '../../shared/hooks/netflix-hook';
/* UI elemenets and components */
import { Header } from '../../components/atoms';
import { SearchForm } from '../../components/organisms';
import { ErrorModal, LoadingSpinner } from '../../components/uiElements';
/* Styling */
import './SearchPage.scss';

/*
Returns the searchpage with the searchform component.
When loaded all countries will be fetched and passed to the searchform component that will use it in a dropdown
*/
export const SearchPage = () => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [countryList, setCountryList] = useState();
	const isMounted = useRef(null);
	const history = useHistory();

	/* Load all available countries and set in state */
	const loadCountries = useCallback(async () => {
		let loadedCountries = [];
		try {
			const response = await fetchNetflixData({
				urlEndpoint: 'countries'
			});
			if (isMounted.current) {
				response.forEach((element) => {
					const newEl = {
						country: element.country.trim(),
						countryId: element.id,
						countrycode: element.countrycode
					};
					loadedCountries.push(newEl);
				});
				if (isMounted.current) {
					setCountryList(loadedCountries);
				}
			}
		} catch (err) {
			// Error is handled by useNetflixClient
		}
	}, [fetchNetflixData]);

	/* Load countries when component is mounted */
	useEffect(() => {
		isMounted.current = true;
		loadCountries();
		return () => {
			isMounted.current = false;
		};
	}, [loadCountries]);

	/* Push to the search results page passing in the search parameters. Activated when the user clicks the 'search' button */
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
					{countryList && <SearchForm countries={countryList} sendFormData={fetchSearchResults} />}
				</div>
			</div>
		</React.Fragment>
	);
};
