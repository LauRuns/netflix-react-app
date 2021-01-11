import React, { useState, useReducer, useEffect } from 'react';
import { validate } from '../../../shared/util/validators';
import { Backdrop } from '../../uiElements';
import './CountryDropdown.scss';
/* Checks input value and returns state for the form */
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

/*
Returns a list of country objects selectable in a dropdown.
The component is used on the sign up form (LoginPage) and in the account section where the user can change the country (CountrySetter).
*/
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

	/*
    Forward the id, value and if the input value is valid (boolean) to the parent component using the dropdown.
    In the parent component these values are used to check if the overall form is valid and if can be submitted.
    */
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	/* Gets fired whenever an input value changes. Passes the action to the useReducer function. */
	const onChangeHandler = (selectedCountry) => {
		dispatch({
			type: 'CLICKED',
			val: selectedCountry,
			validators: validators
		});
		toggle();
	};

	/* Determines if the dropdown list was touched. Passes this action to the useReducer fucntion */
	const touchHandler = () => {
		dispatch({
			type: 'TOUCH'
		});
	};

	/* Opens the dropdown */
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
