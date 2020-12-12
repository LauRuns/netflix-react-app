import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { SearchFormResults } from '../../../components/organisms';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { useAuthentication } from '../../../shared/hooks/authentication-hook';
import { Header } from '../../../components/atoms';
import { LoadingSpinner, ErrorModal, IconButton, Modal } from '../../../components/uiElements';
import { NetflixItem } from '../../../components/molecules';
import './SearchResultsPage.scss';

// remove after development
import {
	testSearchResults,
	singleSearchResult,
	multipleSearchResult
} from '../../../assets/testitems';

export const SearchResultsPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { token } = useAuthentication();
	const isMounted = useRef(null);
	const { search } = useLocation();
	const { title, start_year, end_year, content_type, country } = queryString.parse(search);
	const history = useHistory();

	const [searchResults, setSearchResults] = useState();
	const [selectedItem, setSelectedItem] = useState(null);
	const [showSelected, setShowSelected] = useState(false);

	useEffect(() => {
		isMounted.current = true;
		const fetchSearchData = async () => {
			try {
				const searchResponseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search`,
					'POST',
					JSON.stringify({
						query: title,
						countrylist: country,
						start_year: start_year,
						end_year: end_year,
						type: content_type
					}),
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`
					}
				);
				const { results } = searchResponseData;
				console.log('Responsedata Search results____:', results);
				if (isMounted.current) {
					setSearchResults(results);
				}
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};

		fetchSearchData();
		// setSearchResults(testSearchResults); // <-- dev
		return () => {
			isMounted.current = false;
		};
	}, []);

	const openModal = () => setShowSelected(true);
	const closeModal = () => setShowSelected(false);

	const onSearchItemClickHandler = (e) => {
		setSelectedItem(e);
		openModal();
	};

	const navigateBackToSearch = () => {
		history.push('/search');
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading && <LoadingSpinner asOverlay loadingSpinnerMessage="Searching for data..." />}

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
			{!isLoading && (
				<div className="search-results-page">
					<Header
						style={{ backgroundColor: 'green' }}
						center
						md
						headerActions={
							<IconButton noborder icon="chevron_left" before onClick={navigateBackToSearch}>
								Back to search
							</IconButton>
						}
					>
						{searchResults && <h2>Results for query: {title}</h2>}
					</Header>
					{searchResults && (
						<div className="search-results-page-items">
							<SearchFormResults
								resultData={searchResults}
								onClick={onSearchItemClickHandler}
								header={
									searchResults.length > 1
										? searchResults.length + ' results:'
										: searchResults.length + ' result:'
								}
							/>
						</div>
					)}
				</div>
			)}
		</>
	);
};
