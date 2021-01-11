import React from 'react';
import { Card, ImageContainer } from '../../uiElements';
import './NewItem.scss';

export const NewItem = ({ item, itemClick }) => {
	return (
		<>
			<Card onClick={itemClick} cardStyles={{ display: 'inline-block', margin: '0.5rem' }}>
				<ImageContainer src={item?.img} />
			</Card>
		</>
	);
};
