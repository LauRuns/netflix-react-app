import React from 'react';

import './Chip.scss';

const Chip = (props) => {
	return (
		<div className="chip-container" onClick={props.onClick}>
			<button>{props.name}</button>
		</div>
	);
};

export default Chip;
