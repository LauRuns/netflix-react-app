import React from 'react';

import { Header } from '../../../shared/components/UIElements/header/Header';
import { SampleSlider } from '../../../components/sample-slider/SampleSLider';
import { NetflixItem } from '../../../components/netflixItem/NetflixItem';

import './SearchFormResults.scss';

export const SearchFormResults = ({ resultData, header, onClick }) => {
	console.log(resultData.length);
	if (resultData.length > 4) {
		return (
			<div className="search-form-results-container">
				<Header md center>
					<h2>{header}</h2>
				</Header>
				<SampleSlider slideList={resultData} onClick={onClick} />
			</div>
		);
	} else {
		return (
			<div className="search-form-results-container">
				<Header md center>
					<h2>{header}</h2>
				</Header>
				<div>
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
