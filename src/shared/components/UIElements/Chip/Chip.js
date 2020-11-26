import React from 'react';

import './Chip.scss';

const Chip = (props) => {
	return (
		<div className="chip-container">
			<button onClick={props.onClick}>{props.name}</button>
		</div>
	);
};

export default Chip;
