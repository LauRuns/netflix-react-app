import React, { useContext } from 'react';

import Input from '../../../shared/components/FormElements/Input/Input';
import { VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import Button from '../../../shared/components/UIElements/Button/Button';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import Modal from '../../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import './PasswordChange.css';

const PasswordChange = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [formState, inputHandler] = useForm(
		{
			oldPassword: {
				value: '',
				isValid: false
			},
			newPassword: {
				value: '',
				isValid: false
			},
			confirmNewPassword: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const updatePwdHandler = async (event) => {
		event.preventDefault();

		if (formState.inputs.newPassword.value !== formState.inputs.confirmNewPassword.value) {
			formState.isValid = false;
		}

		try {
			const responeData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/auth/update/${auth.userId}`,
				'PATCH',
				JSON.stringify({
					email: props.email,
					oldPassword: formState.inputs.oldPassword.value,
					newPassword: formState.inputs.newPassword.value,
					confirmNewPassword: formState.inputs.confirmNewPassword.value
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			console.log(responeData);
		} catch (err) {
			// Error is handled by useHttpClient
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{/* <Modal show={}/> */}

			<div className="pwd-change-container">
				<h3>Password change section works</h3>
				{isLoading && <LoadingSpinner center loadingSpinnerMessage="Updating password..." />}
				{!isLoading && (
					<form className="pwd-update-form" onSubmit={updatePwdHandler}>
						<div>
							<Input
								id="oldPassword"
								label="Enter current password"
								element="input"
								type="password"
								validators={[VALIDATOR_MINLENGTH(5)]}
								errorText="Please enter your current password."
								onInput={inputHandler}
								placeholder="Current password"
							/>
						</div>
						<div>
							<Input
								id="newPassword"
								label="Enter new password"
								element="input"
								type="password"
								validators={[VALIDATOR_MAXLENGTH(20), VALIDATOR_MINLENGTH(5)]}
								errorText="Please enter a valid new password, min 5 characters."
								onInput={inputHandler}
								placeholder="New password"
							/>
						</div>
						<div>
							<Input
								id="confirmNewPassword"
								label="Confirm new password"
								element="input"
								type="password"
								validators={[VALIDATOR_MAXLENGTH(20), VALIDATOR_MINLENGTH(5)]}
								errorText="Please confirm your new password."
								onInput={inputHandler}
								placeholder="Confirm new password"
							/>
						</div>
						<Button type="submit" disabled={!formState.isValid}>
							UPDATE PASSWORD
						</Button>
					</form>
				)}
			</div>
		</React.Fragment>
	);
};

export default PasswordChange;
