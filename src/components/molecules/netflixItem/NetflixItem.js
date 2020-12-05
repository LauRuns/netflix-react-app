import React from 'react';

import './NetflixItem.scss';

export const NetflixItem = ({ item }) => {
	return (
		<div className="nf-item-card">
			<div className="nf-item-inner">
				<div className="nf-item-front">
					<img src={item.img} alt="Poster" />
				</div>
				<div className="nf-item-back">
					<p>{item.synopsis}</p>
					<br />
					{item.year && (
						<p>
							<b>Year: </b>
							{item.year}
						</p>
					)}
					{item.imdbrating && (
						<p>
							<b>IMDB rating: </b>
							{item.imdbrating}
						</p>
					)}
					{item.imdblanguage && (
						<p>
							<b>Language: </b>
							{item.imdblanguage}
						</p>
					)}
					{item.imdbgenre && (
						<p>
							<b>Genre: </b>
							{item.imdbgenre}
						</p>
					)}
					{item.nfid && (
						<p>
							<b>Netflix ID: </b>
							{item.nfid}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};
