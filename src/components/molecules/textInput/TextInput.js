import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Label } from '../../atoms/label/Label';
import { FormInput } from '../../atoms/formInput/FormInput';
import { ErrorMessage } from '../../atoms/errorMessage/ErrorMessage';

import './TextInput.scss';

export const TextInput = ({ name, placeholder, inputSize, labelSize, label, type, fieldRef }) => {
	const { errors } = useFormContext();
	console.log(errors);
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
