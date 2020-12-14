import React, { useState, useEffect } from 'react';

import { NavButtons, NewItem } from '../../molecules';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';

import './NewContentList.scss';
import { LoadingSpinner } from '../../uiElements';

export const NewContentList = ({ countryIdCode, itemClick }) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [offset, setOffset] = useState(0);
	const [newItems, setNewItems] = useState(0);

	let searchParams = {
		newdate: new Date('2015-01-01'),
		start_year: 2017,
		orderby: 'date',
		limit: 6,
		countrylist: `${countryIdCode}`,
		audio: 'english',
		offset: offset,
		end_year: 2020
	};

	useEffect(() => {
		try {
			console.log('fetchNewContent');

			const fetchNewContent = async () => {
				const response = await fetchNetflixData({
					urlEndpoint: 'search',
					params: searchParams
				});

				console.log('response', response);
				console.log('fetchNewContent finished');
				setNewItems(response);
			};

			fetchNewContent();
		} catch (error) {
			console.log(error);
		}
	}, [offset]);

	const onLoadNext = () => {
		console.log('onLoadNewNext');
		setOffset(offset + 6);
	};
	const onLoadPrevious = () => {
		console.log('onLoadNewPrevious');
		if (offset !== 0) setOffset(offset - 6);
	};

	return (
		<>
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
