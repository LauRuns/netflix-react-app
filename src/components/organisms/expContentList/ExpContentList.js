import React, { useState, useEffect } from 'react';

import { NavButtons, ExpItem } from '../../molecules';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
import './ExpContentList';

export const ExpContentList = ({ countryIdCode, itemClick }) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [idList, setIdList] = useState(null);
	const [offset, setOffset] = useState(0);

	useEffect(() => {
		try {
			const fetchIds = async () => {
				const response = await fetchNetflixData({
					urlEndpoint: 'expiring',
					params: {
						countrylist: `${countryIdCode}`,
						offset: offset,
						limit: 6
					}
				});
				console.log(response);
				setIdList(response);
			};
			fetchIds();
		} catch (error) {
			console.log(error);
		}
	}, [offset]);

	const onLoadNext = () => {
		console.log('onLoadNext');
		setOffset(offset + 6);
	};
	const onLoadPrevious = () => {
		console.log('onLoadPrevious');
		if (offset !== 0) setOffset(offset - 6);
	};

	return (
		<>
			{!isLoading && (
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
