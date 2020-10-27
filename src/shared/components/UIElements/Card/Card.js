import React from 'react';

import './Card.css';

const card = (props) => {
	return (
		<div className="Card" style={props.cardStyles}>
			{props.children}
		</div>
	);
};

export default card;
