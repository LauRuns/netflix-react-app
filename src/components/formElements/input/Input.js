import React, { useReducer, useEffect } from 'react';

import { validate } from '../../../shared/util/validators';
import './Input.scss';

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

	useEffect(() => {
		onInput(id, value, isValid);
	}, [id, value, isValid, onInput]);

	const onChangeHandler = (event) => {
		dispatch({
			type: 'CHANGE',
			val: event.target.value,
			validators: validators
		});
	};

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
