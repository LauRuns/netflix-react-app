import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Label, ErrorMessage } from '../../atoms/atomsIndex';

import './RadioButtonGroup.scss';

export const RadioButtonGroup = ({ children, name, row, column, label, labelSize }) => {
	const { errors } = useFormContext();
	return (
		<div className={`radio-button-container ${column && 'display-column'} ${row && 'display-row'}`}>
			<Label name={name} size={labelSize}>
				{label}
			</Label>
			{children}
			{errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
		</div>
	);
};
