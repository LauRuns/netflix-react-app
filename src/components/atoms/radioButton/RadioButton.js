import React from 'react';
import { Label } from '../label/Label';
import { FormInput } from '../formInput/FormInput';
import './RadioButton.scss';

export const RadioButton = ({ name, fieldRef, labelSize, label, value, onChange }) => {
	return (
		<div className="radio-button-item">
			<FormInput type="radio" name={name} fieldRef={fieldRef} value={value} onChange={onChange} />
			<Label name={name} size={labelSize}>
				{label}
			</Label>
		</div>
	);
};
