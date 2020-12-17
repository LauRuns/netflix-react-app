import React from 'react';

import './Card.scss';

export const Card = (props) => {
	return (
		<div
			className={`Card ${props.expire && 'expire-card'} ${props.searchresult && 'sr-card'} ${
				props.homecard && 'home-card'
			}`}
			style={props.cardStyles}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};
