import React from 'react';

import './Chip.css';

const Chip = (props) => {
	return (
		<div className="chip-container">
			<h3 onClick={props.onClick}>{props.name}</h3>
		</div>
	);
};

export default Chip;
