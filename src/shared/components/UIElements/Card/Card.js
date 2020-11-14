import React from 'react';

import './Card.scss';

const card = (props) => {
	return (
		<div
			className={`Card ${props.expire && 'expire-card'} ${props.login && 'login-card'} ${
				props.searchresult && 'sr-card'
			}`}
			style={props.cardStyles}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};

export default card;
