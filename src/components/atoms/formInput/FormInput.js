import React from 'react';
import './FormInput.scss';

export const FormInput = ({
	children,
	type,
	placeholder,
	size,
	name,
	fieldRef,
	value,
	onChange
}) => {
	return (
		<input
			type={type || 'text'}
			placeholder={placeholder}
			className={`input-item input--${size}`}
			name={name}
			id={name}
			ref={fieldRef}
			value={value}
			onChange={onChange}
		>
			{children}
		</input>
	);
};
