import React from 'react';
import { useFormContext } from 'react-hook-form';

import { Label, ErrorMessage } from '../../atoms';
import { Select } from '../select/Select';
import './Dropdown.scss';

export const Dropdown = ({ label, name, dropdownData, size, fieldRef, onChange }) => {
	const { errors } = useFormContext();

	return (
		<div className="dropdown-container">
			<Label size={size} name={name}>
				{label}
			</Label>
			<Select
				name={name}
				items={dropdownData}
				size={size}
				fieldRef={fieldRef}
				onChange={onChange}
			/>
			{errors[name] && <ErrorMessage>{errors[name].message}</ErrorMessage>}
		</div>
	);
};
