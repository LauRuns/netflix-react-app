import React from 'react';

import './Card.css';

const card = (props) => {
	return (
		<div
			className={`Card ${props.expire && 'card-expire-item'} ${props.login && 'login-card'}`}
			style={props.cardStyles}
			onClick={props.onClick}
		>
			{props.children}
		</div>
	);
};

export default card;
