import React from 'react';
import './Label.scss';

export const Label = ({ name, size, children }) => {
	return (
		<label className={`label-item label--${size}`} htmlFor={name}>
			{children}
		</label>
	);
};
