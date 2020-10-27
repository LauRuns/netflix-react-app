import React from 'react';

import Card from '../../../shared/components/UIElements/Card/Card';
import './Country.css';

const country = (props) => {
	return (
		<li className="Country-item">
			<Card className="Country-item__content">
				<h3>{props.country}</h3>
			</Card>
		</li>
	);
};

export default country;
