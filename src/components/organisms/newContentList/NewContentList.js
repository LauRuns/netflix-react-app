import React, { useState, useEffect, useRef } from 'react';
/* Hooks and context */
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
/* UI elements and components */
import { NavButtons, NewItem } from '../../molecules';
import { LoadingSpinner, ErrorModal } from '../../uiElements';
/* Styling */
import './NewContentList.scss';

/*
Returns a list of NewItem(s). Takes in a countrycode for which it will fetch the new Netflix items.
When a NewItem is clicked then the onClick is returned to the parent component.

Holds a NavButtons component that allows for updating the search offset and returning the next set of NewItem(s)
*/
export const NewContentList = ({ countryIdCode, itemClick }) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [offset, setOffset] = useState(0);
	const [newItems, setNewItems] = useState(0);

	const isMounted = useRef(null);

	useEffect(() => {
		isMounted.current = true;
		const storedCountry = JSON.parse(localStorage.getItem('countryData'));
		let searchParams = {
			newdate: new Date('2015-01-01'),
			start_year: 2017,
			orderby: 'date',
			limit: 5,
			countrylist: countryIdCode ? countryIdCode : storedCountry.countryData.countryId,
			audio: 'english',
			offset: offset,
			end_year: 2020
		};
		const fetchNewContent = async () => {
			try {
				const response = await fetchNetflixData({
					urlEndpoint: 'search',
					params: searchParams
				});
				if (isMounted.current) setNewItems(response);
			} catch (error) {
				// Error is handled by the useNetflixClient hook
			}
		};
		fetchNewContent();
		return () => {
			isMounted.current = false;
		};
	}, [offset]); // eslint-disable-line react-hooks/exhaustive-deps

	/* Changes the state for 'offset' and makes useEffect run again to fetch new content + 5 */
	const onLoadNext = () => {
		setOffset(offset + 5);
	};

	/* Changes the state for 'offset' and makes useEffect run again to fetch new content - 5 */
	const onLoadPrevious = () => {
		if (offset !== 0) setOffset(offset - 5);
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading ? (
				<LoadingSpinner center loadingSpinnerMessage="Fetching new data..." />
			) : (
				<div className="new-content-list">
					<NavButtons onNext={onLoadNext} onPrevious={onLoadPrevious} disabled={offset === 0} />
					<div>
						{newItems &&
							newItems.map((item, index) => {
								return <NewItem key={index} itemClick={() => itemClick(item)} item={item} />;
							})}
					</div>
				</div>
			)}
		</>
	);
};
