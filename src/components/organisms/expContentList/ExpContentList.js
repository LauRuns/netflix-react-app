import React, { useState, useEffect, useRef, useCallback } from 'react';
/* Hooks and context */
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
/* UI elements and components */
import { NavButtons, ExpItem } from '../../molecules';
import { LoadingSpinner, ErrorModal } from '../../uiElements';
/* Styling */
import './ExpContentList.scss';

/*
Returns a list of ExpItem(s). Takes in a countrycode for which it will fetch the expiring Netflix items.
When a ExpItem is clicked then the onClick is returned to the parent component.
Holds a NavButtons component that allows for updating the search offset and returning the next set of ExpItem(s)

___Difference NewContentList vs ExpContentList:

Fetching Expiring content works diffrent from fetching new content. The unogsNG API returns only a list of ID's with title for expiring content.
For new content a complete new item is returned containing all the data. Therefore an extra step has to made to fetch the content for the expiring item.
First the list of ID's must be fetched and then each inidividual ID is passed on to the ExpItem. The ExpItem the fetches the content for the ID it takes in as a prop,
making an extra call top the unogsNG API.

___How is this different from a NewItem?

>> The NewItem does not have to make additional calls to the API iot fetch its content.
>> This is already part of the list of items. Therefore NewItem(s) are fetched faster and have less loading time.

*/
export const ExpContentList = ({ countryIdCode, itemClick }) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [idList, setIdList] = useState(null);
	const [offset, setOffset] = useState(0);

	const _isMounted = useRef(null);

	/* Fetch the list of expiring ID's */
	const fetchIds = useCallback(async () => {
		const storedCountry = JSON.parse(localStorage.getItem('countryData'));
		try {
			const response = await fetchNetflixData({
				urlEndpoint: 'expiring',
				params: {
					countrylist: countryIdCode ? countryIdCode : storedCountry.countryData.countryId,
					offset: offset,
					limit: 5
				}
			});
			if (_isMounted.current) {
				setIdList(response);
			}
		} catch (error) {
			console.error(error);
		}
	}, [countryIdCode, offset, fetchNetflixData]);

	/* Fetch the list of ID's when the component is mounted */
	useEffect(() => {
		_isMounted.current = true;
		fetchIds();
		return () => {
			_isMounted.current = false;
		};
	}, [offset, fetchIds]);

	/* Change the offset with the NavButtons and fetch the next 5 items */
	const onLoadNext = () => {
		setOffset(offset + 5);
	};
	/* Change the offset with the NavButtons and fetch the previous 5 items - disabled when offset is 0 */
	const onLoadPrevious = () => {
		if (offset !== 0) setOffset(offset - 5);
	};

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading ? (
				<LoadingSpinner center loadingSpinnerMessage="Fetching expiting data..." />
			) : (
				<div className="exp-content-list">
					<NavButtons onNext={onLoadNext} onPrevious={onLoadPrevious} disabled={offset === 0} />
					<div>
						{idList &&
							idList.map(({ netflixid, title }) => {
								return (
									<ExpItem
										key={netflixid}
										netflixid={netflixid}
										title={title}
										itemClick={itemClick}
									/>
								);
							})}
					</div>
				</div>
			)}
		</>
	);
};
