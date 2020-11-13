import React from 'react';

import './Card.scss';

const card = (props) => {
	return (
		<div
			className={`Card ${props.expire && 'card-expire-item'} ${props.login && 'login-card'} ${
				props.searchresult && 'search-result-card sr-card'
			}`}
			style={props.cardStyles}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};

export default card;
