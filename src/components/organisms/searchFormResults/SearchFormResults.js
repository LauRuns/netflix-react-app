import React from 'react';

import { Header } from '../../atoms';
import { NetflixItem, NewItem } from '../../molecules';

import './SearchFormResults.scss';

export const SearchFormResults = ({ resultData, header, onClick }) => {
	if (resultData.length > 4) {
		return (
			<div className="search-form-results-container">
				<Header md center>
					<h2>{header}</h2>
				</Header>
				<div className="search-form-results-items">
					{resultData &&
						resultData.map((item, index) => {
							return <NewItem key={index} item={item} itemClick={() => onClick(item)} />;
						})}
				</div>
			</div>
		);
	} else {
		return (
			<div className="search-form-results-container">
				<Header md center>
					<h2>{header}</h2>
				</Header>
				<div className="search-form-results-items">
					{resultData &&
						resultData.map((item, index) => {
							return (
								<NetflixItem
									key={index}
									item={item}
									onClick={() => onClick(item)}
									style={{ margin: '0.5rem' }}
								/>
							);
						})}
				</div>
			</div>
		);
	}
};
