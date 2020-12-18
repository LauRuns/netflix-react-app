import React, { useState, useEffect, useRef } from 'react';
import { Card, ImageContainer, LoadingSpinner, ErrorModal } from '../../uiElements';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';

import './ExpItem.scss';

export const ExpItem = ({ netflixid, itemClick }) => {
	const [expItem, setExpItem] = useState(null);
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();

	const isMounted = useRef(null);

	useEffect(() => {
		isMounted.current = true;
		try {
			const fetchExpItem = async () => {
				const response = await fetchNetflixData({
					urlEndpoint: 'title',
					params: {
						netflixid: netflixid
					}
				});
				if (isMounted.current) setExpItem(response[0]);
			};
			fetchExpItem();
		} catch (error) {
			console.log(error);
		}

		return () => {
			isMounted.current = false;
		};
	}, []);

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
