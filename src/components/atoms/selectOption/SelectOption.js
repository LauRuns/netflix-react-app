import React from 'react';

export const SelectOption = ({ name, children, fieldRef, value }) => {
	return (
		<option name={name} ref={fieldRef} value={value}>
			{children}
		</option>
	);
};
