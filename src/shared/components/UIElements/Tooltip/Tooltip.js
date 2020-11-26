import React, { useState } from 'react';
import './Tooltip.scss';

export const Tooltip = ({ direction, delay, message, children }) => {
	let timeout;
	const [active, setActive] = useState(false);

	const showTip = () => {
		timeout = setTimeout(() => {
			setActive(true);
		}, delay || 400);
	};

	const hideTip = () => {
		clearInterval(timeout);
		setActive(false);
	};

	return (
		<div className="Tooltip-Wrapper" onMouseEnter={showTip} onMouseLeave={hideTip}>
			{children}
			{active && <div className={`Tooltip-Tip ${direction || 'top'}`}>{message}</div>}
		</div>
	);
};
