import React, { useState, useEffect } from 'react';
import { Card, ImageContainer, LoadingSpinner } from '../../uiElements';
import { useNetflixClient } from '../../../shared/hooks/netflix-hook';

import './ExpItem.scss';

export const ExpItem = ({ netflixid, title, itemClick }) => {
	const [expItem, setExpItem] = useState(null);
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();

	useEffect(() => {
		try {
			const fetchExpItem = async () => {
				const response = await fetchNetflixData({
					urlEndpoint: 'title',
					params: {
						netflixid: netflixid
					}
				});
				console.log(response[0]);
				setExpItem(response[0]);
			};
			fetchExpItem();
		} catch (error) {
			console.log(error);
		}
	}, []);

	return (
		<>
			{isLoading ? (
				<LoadingSpinner center />
			) : (
				<Card
					onClick={() => itemClick(expItem)}
					cardStyles={{ display: 'inline-block', margin: '0.5rem' }}
				>
					<ImageContainer src={expItem?.img} imgSize={24} />
				</Card>
			)}
		</>
	);
};
