import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Card, ImageContainer, LoadingSpinner, ErrorModal } from '../../uiElements';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';

import './ExpItem.scss';

export const ExpItem = ({ netflixid, itemClick }) => {
	const [expItem, setExpItem] = useState(null);
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();

	const isMounted = useRef(null);

	const fetchExpItem = useCallback(async () => {
		try {
			const response = await fetchNetflixData({
				urlEndpoint: 'title',
				params: {
					netflixid: netflixid
				}
			});
			if (isMounted.current) setExpItem(response[0]);
		} catch (error) {
			// Error is handled by the useNetflixClient hook
		}
	}, [fetchNetflixData, netflixid]);

	useEffect(() => {
		isMounted.current = true;
		fetchExpItem();
		return () => {
			isMounted.current = false;
		};
	}, [fetchExpItem]);

	return (
		<>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading ? (
				<LoadingSpinner center />
			) : (
				<Card
					onClick={() => itemClick(expItem)}
					cardStyles={{ display: 'inline-block', margin: '0.5rem' }}
				>
					<ImageContainer src={expItem?.img} />
				</Card>
			)}
		</>
	);
};
