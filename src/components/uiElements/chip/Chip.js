import React from 'react';

import './Chip.scss';

export const Chip = ({ onClick, name }) => {
	return (
		<div className="chip-container" onClick={onClick}>
			<button>{name}</button>
		</div>
	);
};
