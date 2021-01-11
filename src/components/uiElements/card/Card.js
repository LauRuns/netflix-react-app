import React from 'react';
import './Card.scss';

/* Returns a styled div that takes in additional props for styling and forwards onClick events */
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
