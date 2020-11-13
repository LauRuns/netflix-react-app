import React from 'react';

import './Chip.scss';

const Chip = (props) => {
	return (
		<div className="chip-container">
			<h3 onClick={props.onClick}>{props.name}</h3>
		</div>
	);
};

export default Chip;
