import React, { useState, useReducer, useEffect } from 'react';
import { validate } from '../../../shared/util/validators';

import { Backdrop } from '../../uiElements';

import './CountryDropdown.scss';

const selectionReducer = (state, action) => {
	switch (action.type) {
		case 'CLICKED':
			return {
				...state,
				value: action.val,
				isValid: validate(action.val, action.validators)
			};
		case 'TOUCH': {
			return {
				...state,
				isTouched: true
			};
		}
		default:
			return state;
	}
};

export const CountryDropdown = ({
	title,
	items,
	initialValue,
	initialValid,
	onInput,
	id,
	label,
	validators,
	errorText
}) => {
	const [selectionState, dispatch] = useReducer(selectionReducer, {
		value: initialValue || null,
		isTouched: false,
		isValid: initialValid || false
	});
	const [open, setOpen] = useState(false);
	const [showBackDrop, setShowBackDrop] = useState(false);

	const { value, isValid } = selectionState;

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const onChangeHandler = (selectedCountry) => {
		dispatch({
			type: 'CLICKED',
			val: selectedCountry,
			validators: validators
		});
		toggle();
	};

	const touchHandler = () => {
		dispatch({
			type: 'TOUCH'
		});
	};

	const toggle = () => {
		setShowBackDrop(!showBackDrop);
		setOpen(!open);
		touchHandler();
	};

	return (
		<>
			{showBackDrop && <Backdrop onClick={toggle} />}
			<div
				className={`dd-container ${
					!selectionState.isValid && selectionState.isTouched && 'dropdown-state--invalid'
				}`}
			>
				<div className="dd-label">
					<label htmlFor={id}>{label}</label>
				</div>
				<div id={id} className="dd-wrapper">
					<div
						tabIndex={0}
						className="dd-header"
						role="button"
						onKeyPress={toggle}
						onClick={toggle}
					>
						<div className={`${selectionState.value?.country && 'dd-header__title'}`}>
							<p>{value ? value.country : title}</p>
						</div>
						<div className="dd-header__action">
							<p>{open ? 'Close' : 'Open'}</p>
						</div>
					</div>
					{open && (
						<ul className="dd-list">
							{items.map((item) => (
								<li className="dd-list-item" key={item.countryId}>
									<button type="button" onClick={() => onChangeHandler(item)}>
										<span>{item.country}</span>
									</button>
								</li>
							))}
						</ul>
					)}
				</div>
				{!selectionState.value && selectionState.isTouched && (
					<p id="dropdown-errortext">{errorText}</p>
				)}
			</div>
		</>
	);
};
