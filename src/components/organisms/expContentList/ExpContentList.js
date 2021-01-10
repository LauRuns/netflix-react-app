import React, { useState, useEffect, useRef, useCallback } from 'react';

import { NavButtons, ExpItem } from '../../molecules';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';
import { LoadingSpinner, ErrorModal } from '../../uiElements';
import './ExpContentList.scss';

export const ExpContentList = ({ countryIdCode, itemClick }) => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const [idList, setIdList] = useState(null);
	const [offset, setOffset] = useState(0);

	const _isMounted = useRef(null);

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

	useEffect(() => {
		_isMounted.current = true;

		fetchIds();

		return () => {
			_isMounted.current = false;
		};
	}, [offset, fetchIds]);

	const onLoadNext = () => {
		setOffset(offset + 5);
	};
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
