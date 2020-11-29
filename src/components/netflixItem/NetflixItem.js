import React from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import { ImageContainer } from '../../shared/components/UIElements/image-container/ImageContainer';
import './NetflixItem.scss';

export const NetflixItem = ({ item }) => {
	return (
		<Card>
			<div className="netflix-item__content">
				<div>
					<p>{item.synopsis}</p>
					<br />
					<p>
						<b>Year: </b>
						{item.year || 'No data available'}
					</p>
					<p>
						<b>IMDB rating: </b>
						{item.imdbrating || 'No data available'}
					</p>
					<p>
						<b>Language: </b>
						{item.imdblanguage || 'No data available'}
					</p>
					<p>
						<b>Genre: </b>
						{item.imdbgenre || 'No data available'}
					</p>
				</div>
				<div className="netflix-item__image">
					<ImageContainer src={item.img} alt={item.title} />
				</div>
			</div>
		</Card>
	);
};
