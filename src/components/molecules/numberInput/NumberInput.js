import React from 'react';

import { useFormContext } from 'react-hook-form';
import { Label, FormInput, ErrorMessage } from '../../atoms';

import './NumberInput.scss';

export const NumberInput = ({ name, inputSize, labelSize, placeholder, label, fieldRef }) => {
	const { errors } = useFormContext();

	return (
		<div className="number-input-container">
			<Label name={name} size={labelSize}>
				{label}
			</Label>
			<FormInput
				type="number"
				placeholder={placeholder}
				size={inputSize}
				name={name}
				fieldRef={fieldRef}
			/>
			{errors[name] && <ErrorMessage>{errors[name].message || 'Error'}</ErrorMessage>}
		</div>
	);
};
