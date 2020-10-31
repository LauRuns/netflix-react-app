import React from 'react';

import './LoadingSpinner.css';

const LoadingSpinner = (props) => {
	return (
		<div className={`${props.asOverlay && 'loading-spinner__overlay'} ${props.center && 'center'}`}>
			<div className="lds-dual-ring" />
			<p>{props.loadingSpinnerMessage}</p>
		</div>
	);
};

export default LoadingSpinner;
