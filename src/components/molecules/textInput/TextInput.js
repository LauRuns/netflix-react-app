import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Label, FormInput, ErrorMessage } from '../../atoms';
import './TextInput.scss';

/* Returns a textinput that is used icw react-hook-form */
export const TextInput = ({ name, placeholder, inputSize, labelSize, label, type, fieldRef }) => {
	const { errors } = useFormContext();

	return (
		<div className="text-input-container">
			<Label name={name} size={labelSize}>
				{label}
			</Label>
			<FormInput
				type={type}
				placeholder={placeholder}
				size={inputSize}
				name={name}
				fieldRef={fieldRef}
			/>
			{errors[name] && <ErrorMessage>{errors[name].message || 'Error occurred'}</ErrorMessage>}
		</div>
	);
};
