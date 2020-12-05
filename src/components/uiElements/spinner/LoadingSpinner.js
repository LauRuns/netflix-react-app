import React from 'react';

import './LoadingSpinner.scss';

export const LoadingSpinner = ({ asOverlay, center, loadingSpinnerMessage }) => {
	return (
		<div className={`${asOverlay && 'loading-spinner__overlay'} ${center && 'center-column'}`}>
			<div className="lds-dual-ring" />
			<p>{loadingSpinnerMessage}</p>
		</div>
	);
};
