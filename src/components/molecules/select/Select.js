import React from 'react';

import { SelectOption } from '../../atoms';
import './Select.scss';

export const Select = ({ items, size, fieldRef, name }) => {
	return (
		<div className={`select-container select--${size}`}>
			<select name={name} ref={fieldRef}>
				{items &&
					items.map(({ country, countryId }, index) => {
						return (
							<SelectOption key={index} value={countryId}>
								{country}
							</SelectOption>
						);
					})}
			</select>
		</div>
	);
};
