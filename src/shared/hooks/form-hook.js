import { useCallback, useReducer } from 'react';

/*
Switch method that takes in the state and an action.
Returns if provided inputs are valid and sets form isValid | !isValid
*/
const formReducer = (state, action) => {
	switch (action.type) {
		case 'INPUT_CHANGE': {
			let formIsValid = true;
			for (const inputId in state.inputs) {
				if (!state.inputs[inputId]) {
					continue;
				}
				if (inputId === action.inputId) {
					formIsValid = formIsValid && action.isValid;
				} else {
					formIsValid = formIsValid && state.inputs[inputId].isValid;
				}
			}
			return {
				...state,
				inputs: {
					...state.inputs,
					[action.inputId]: { value: action.value, isValid: action.isValid }
				},
				isValid: formIsValid
			};
		}
		case 'SET_DATA':
			return {
				inputs: action.inputs,
				isValid: action.formIsValid
			};
		default:
			return state;
	}
};

/*
Hook for providing form validation.
Takes in the provided form values and initial validities.
Returns the current formstate, an inputHandler and setFormData
*/
export const useForm = (initialInputs, initialFormValidity) => {
	const [formState, dispatch] = useReducer(formReducer, {
		inputs: initialInputs,
		isValid: initialFormValidity
	});

	/* Takes in the changing values and runs it by the formReducer to check for validity */
	const inputHandler = useCallback((id, value, isValid) => {
		dispatch({
			type: 'INPUT_CHANGE',
			value: value,
			isValid: isValid,
			inputId: id
		});
	}, []);

	/* Method for setting initial form values when provided */
	const setFormData = useCallback((inputData, formValidity) => {
		dispatch({
			type: 'SET_DATA',
			inputs: inputData,
			formIsValid: formValidity
		});
	}, []);

	return [formState, inputHandler, setFormData];
};
