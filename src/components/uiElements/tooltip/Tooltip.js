import React, { useState } from 'react';
import './Tooltip.scss';

export const Tooltip = ({ direction, message, children }) => {
	const [active, setActive] = useState(false);

	const showTip = () => {
		setActive(true);
	};

	const hideTip = () => {
		setActive(false);
	};

	return (
		<div className="Tooltip-Wrapper" onMouseEnter={showTip} onMouseLeave={hideTip}>
			{children}
			{active && <div className={`Tooltip-Tip ${direction || 'top'}`}>{message}</div>}
		</div>
	);
};
