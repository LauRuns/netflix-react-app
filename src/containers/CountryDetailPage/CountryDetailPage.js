import React from 'react';
import { NavLink } from 'react-router-dom';

import './CountryDetailPage.css';

const CountryDetailPage = (props) => {
	console.log('__PROPS detail page:', props);
	const { name, countryId } = props.location.state;
	return (
		<React.Fragment>
			<div className="nav-back">
				<NavLink to="/">BACK</NavLink>
			</div>
			<div className="cntry-detail-page-container">
				<h1>Country Detail Page works</h1>
				<h3>{name}</h3>
				<h3>{countryId}</h3>
			</div>
		</React.Fragment>
	);
};

export default CountryDetailPage;
