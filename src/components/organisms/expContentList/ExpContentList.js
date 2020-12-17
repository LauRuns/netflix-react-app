import React, { useState, useEffect, useRef } from 'react';

import { NavButtons, ExpItem } from '../../molecules';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
import { LoadingSpinner, ErrorModal } from '../../uiElements';
import './ExpContentList.scss';

export const ExpContentList = ({ countryIdCode, itemClick }) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [idList, setIdList] = useState(null);
	const [offset, setOffset] = useState(0);

	const _isMounted = useRef(null);

	useEffect(() => {
		_isMounted.current = true;

		const fetchIds = async () => {
			try {
				const response = await fetchNetflixData({
					urlEndpoint: 'expiring',
					params: {
						countrylist: `${countryIdCode}`,
						offset: offset,
						limit: 5
					}
				});
				if (_isMounted.current) {
					setIdList(response);
				}
			} catch (error) {
				console.log(error);
			}
		};
		fetchIds();

		return () => {
			_isMounted.current = false;
		};
	}, [offset]);

	const onLoadNext = () => {
		console.log('onLoadNext');
		setOffset(offset + 5);
	};
	const onLoadPrevious = () => {
		console.log('onLoadPrevious');
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
