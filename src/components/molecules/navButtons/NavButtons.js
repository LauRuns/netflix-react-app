import React from 'react';

import { IconButton } from '../../uiElements';
import './NavButtons.scss';

export const NavButtons = ({ onNext, onPrevious, disabled }) => {
	return (
		<div className="nav-buttons">
			<IconButton noborder before icon="chevron_left" onClick={onPrevious} disabled={disabled}>
				Previous
			</IconButton>
			<IconButton noborder icon="chevron_right" onClick={onNext}>
				Next
			</IconButton>
		</div>
	);
};
