import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
/* Hooks and context */
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
/* UI elements and components */
import { SearchFormResults } from '../../../components/organisms';
import { Header } from '../../../components/atoms';
import { LoadingSpinner, ErrorModal, IconButton, Modal } from '../../../components/uiElements';
import { NetflixItem } from '../../../components/molecules';
/* Styling */
import './SearchResultsPage.scss';

/* Returns and presents the search results based on the users search query which are passed in as parameters */
export const SearchResultsPage = () => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const { search } = useLocation();
	const { title, start_year, end_year, content_type, country } = queryString.parse(search);

	const isMounted = useRef(null);
	const history = useHistory();

	const [searchResults, setSearchResults] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [showSelected, setShowSelected] = useState(false);
	const [noResults, setNoResults] = useState(null);

	/* Search parameter variable has default order by date and audio set to english */
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

	/* When component is mounted fetch the search results and set them in state */
	useEffect(() => {
		isMounted.current = true;
		const fetchSearchData = async () => {
			try {
				const searchResponse = await fetchNetflixData({
					urlEndpoint: 'search',
					params: searchParams
				});
				if (isMounted.current) {
					if (!searchResponse) {
						setNoResults(true);
					} else {
						setSearchResults(searchResponse);
					}
				}
			} catch (err) {
				// Error is handled by useNetflixClient
			}
		};
		fetchSearchData();
		return () => {
			isMounted.current = false;
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	/* Open the modal based on state */
	const openModal = () => setShowSelected(true);
	const closeModal = () => setShowSelected(false);

	/* Set the selected / clicked search result item in state which triggers an action by the modal -> opening and presenting the data */
	const onSearchItemClickHandler = (e) => {
		setSelectedItem(e);
		openModal();
	};

	/* On clicking this button -> navigate back to the search page to perform a new search */
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
					{searchResults && !noResults ? (
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
					) : (
						<Modal
							show={noResults}
							header="No results..."
							footer={
								<IconButton
									icon="close"
									before
									buttonType="button"
									noborder
									iconStyle={{ marginRight: '0.5rem' }}
									onClick={() => history.push('/search')}
								>
									Back to search
								</IconButton>
							}
						/>
					)}
				</div>
			)}
		</>
	);
};
