import React from 'react';

import './NetflixItem.scss';

export const NetflixItem = ({ item }) => {
	return (
		<div className="flip-card">
			<div className="flip-card-inner">
				<div className="flip-card-front">
					<img src={item.img} alt="Avatar" />
				</div>
				<div className="flip-card-back">
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
