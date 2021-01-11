import React, { useReducer, useEffect } from 'react';
import { validate } from '../../../shared/util/validators';
import './Input.scss';

/* Checks input value and returns state for the form */
const inputReducer = (state, action) => {
	switch (action.type) {
		case 'CHANGE':
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
Returns a input field and allows for setting props.
Returns the input value to the parent component.
*/
export const Input = ({
	initialValue,
	initialValid,
	onInput,
	id,
	label,
	placeholder,
	validators,
	element,
	type,
	row,
	errorText
}) => {
	const [inputState, dispatch] = useReducer(inputReducer, {
		value: initialValue || '',
		isTouched: false,
		isValid: initialValid || false
	});
	const { value, isValid } = inputState;
	/*
    Forward the id, value and if the input value is valid (boolean) to the parent component using the dropdown.
    In the parent component these values are used to check if the overall form is valid and if can be submitted.
    */
	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	/* Gets fired whenever an input value changes. Passes the action to the useReducer function. */
	const onChangeHandler = (event) => {
		dispatch({
			type: 'CHANGE',
			val: event.target.value,
			validators: validators
		});
	};

	/* Determines if the dropdown list was touched. Passes this action to the useReducer fucntion */
	const touchhandler = () => {
		dispatch({
			type: 'TOUCH'
		});
	};

	const selectedElement =
		element === 'input' ? (
			<input
				id={id}
				type={type}
				placeholder={placeholder}
				onChange={onChangeHandler}
				onBlur={touchhandler}
				value={inputState.value}
			/>
		) : (
			<textarea
				id={id}
				rows={row || 3}
				onChange={onChangeHandler}
				onBlur={touchhandler}
				value={inputState.value}
			/>
		);

	return (
		<div
			className={`form-control ${
				!inputState.isValid && inputState.isTouched && 'form-control--invalid'
			}`}
		>
			<label htmlFor={id}>{label}</label>
			{selectedElement}
			{!inputState.value && inputState.isTouched && <p id="input-errortext">{errorText}</p>}
		</div>
	);
};
