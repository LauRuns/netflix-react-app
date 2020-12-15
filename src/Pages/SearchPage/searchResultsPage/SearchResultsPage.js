import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';

import { SearchFormResults } from '../../../components/organisms';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
import { Header } from '../../../components/atoms';
import { LoadingSpinner, ErrorModal, IconButton, Modal } from '../../../components/uiElements';
import { NetflixItem } from '../../../components/molecules';
import './SearchResultsPage.scss';

export const SearchResultsPage = () => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const { search } = useLocation();
	const { title, start_year, end_year, content_type, country } = queryString.parse(search);

	const isMounted = useRef(null);
	const history = useHistory();

	const [searchResults, setSearchResults] = useState();
	const [selectedItem, setSelectedItem] = useState(null);
	const [showSelected, setShowSelected] = useState(false);

	let searchParams = {
		query: title,
		offset: 0,
		start_year,
		orderby: 'date',
		countrylist: `${country}`,
		audio: 'english',
		type: content_type,
		end_year
	};

	useEffect(() => {
		isMounted.current = true;
		const fetchSearchData = async () => {
			try {
				const searchResponse = await fetchNetflixData({
					urlEndpoint: 'search',
					params: searchParams
				});
				if (isMounted.current) setSearchResults(searchResponse);
			} catch (err) {
				// Error is handled by useNetflixClient
			}
		};

		fetchSearchData();
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
						center
						md
						headerActions={
							<IconButton noborder icon="chevron_left" before onClick={navigateBackToSearch}>
								Back to search
							</IconButton>
						}
					>
						{searchResults && <h2>Results for query: '{title}'</h2>}
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
