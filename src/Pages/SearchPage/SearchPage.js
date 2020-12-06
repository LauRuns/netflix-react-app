import React, { useState, useEffect, useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { Header } from '../../components/atoms';
import { NetflixItem } from '../../components/molecules';
import { SearchForm, SearchFormResults } from '../../components/organisms';
import { ErrorModal, LoadingSpinner, IconButton, Modal } from '../../components/uiElements';

// remove after development
// import {
// 	testCountryList,
// 	testSearchResults,
// 	singleSearchResult,
// 	multipleSearchResult
// } from '../../assets/testitems';

import './SearchPage.scss';

export const SearchPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [countryList, setCountryList] = useState();
	const [searchResults, setSearchResults] = useState();

	const [selectedItem, setSelectedItem] = useState(null);
	const [showSelected, setShowSelected] = useState(false);

	const loadCountries = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
			);
			const { results, count } = responseData;
			console.log('Loaded country data____:', results);
			console.log('Nr of loaded countries:____:', count);
			setCountryList(results);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	useEffect(() => {
		// setCountryList(testCountryList);
		// setSearchResults(testSearchResults);
		// setSearchResults(singleSearchResult);
		// setSearchResults(multipleSearchResult);

		loadCountries();
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

	const openModal = () => setShowSelected(true);
	const closeModal = () => setShowSelected(false);

	const resultItemClikedHandler = (data) => {
		console.log('resultItemClikedHandler____:', data);
		setSelectedItem(data);
		openModal();
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{selectedItem && (
				<Modal
					show={showSelected}
					header={selectedItem.title}
					onCancel={closeModal}
					footer={
						<IconButton
							icon="cancel"
							buttonType="button"
							before
							inverse
							iconStyle={{ marginRight: '0.5rem' }}
							onClick={closeModal}
						>
							CLOSE
						</IconButton>
					}
				>
					<NetflixItem item={selectedItem} />
				</Modal>
			)}
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
					{isLoading && <LoadingSpinner center loadingSpinnerMessage="Bussy fetching data..." />}
					{!isLoading && searchResults && (
						<SearchFormResults
							resultData={searchResults}
							onClick={resultItemClikedHandler}
							header={
								searchResults.length > 1
									? searchResults.length + ' results:'
									: searchResults.length + ' result:'
							}
						/>
					)}
				</div>
			</div>
		</React.Fragment>
	);
};
