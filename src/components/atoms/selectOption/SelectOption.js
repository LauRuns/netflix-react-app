import React from 'react';

import './SelectOption.scss';

export const SelectOption = ({ name, children, fieldRef, value }) => {
	return (
		<option name={name} ref={fieldRef} value={value}>
			{children}
		</option>
	);
};
