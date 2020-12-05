import React, { useContext } from 'react';

import Input from '../../../../shared/components/FormElements/Input/Input';
import { VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH } from '../../../../shared/util/validators';
import { useForm } from '../../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import { AuthContext } from '../../../../shared/context/auth-context';
import LoadingSpinner from '../../../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../../../shared/components/UIElements/Modal/ErrorModal';
import { IconButton } from '../../../../shared/components/UIElements/iconButton/IconButton';

import './PasswordChange.scss';

export const PasswordChange = (props) => {
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
			return alert("The new and confirm password don't match... Please try again.");
		}

		try {
			const responseData = await sendRequest(
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

			if (responseData) {
				props.closeSection();
			}
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<div className="pwd-change-container">
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
						<IconButton
							icon="save"
							iconSize={24}
							iconColor="#fff"
							disabled={!formState.isValid}
							buttonType="submit"
							before
							iconStyle={{ marginRight: '.5rem' }}
						>
							UPDATE
						</IconButton>
					</form>
				)}
			</div>
		</React.Fragment>
	);
};
