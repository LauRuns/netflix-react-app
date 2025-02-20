import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
/* Hooks and context */
import { VALIDATOR_MINLENGTH, VALIDATOR_MAXLENGTH } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
/* UI elements and components */
import { IconButton, ErrorModal, LoadingSpinner, Modal } from '../../components/uiElements';
import { Input } from '../../components/formElements/input/Input';
import { Header } from '../../components/atoms';

/*
Presents a form for resetting the forgotten password.
Manages the form state, validity and returns a message upon succes or error.
*/
export const PasswordResetPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { token } = useParams();
	const [response, setResponse] = useState(null);
	const history = useHistory();

	/* Form hook for managing the form state */
	const [formState, inputHandler] = useForm(
		{
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

	/* Send the form data to the backend. Performs a check if new and confirm password match prior to sending the data. */
	const resetPwdHandler = async (event) => {
		event.preventDefault();

		if (formState.inputs.newPassword.value !== formState.inputs.confirmNewPassword.value) {
			return alert("The new and confirm password don't match... Please try again.");
		}

		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/auth/reset/pwd/${token}`,
				'POST',
				JSON.stringify({
					newPassword: formState.inputs.newPassword.value,
					confirmNewPassword: formState.inputs.confirmNewPassword.value
				}),
				{
					'Content-Type': 'application/json'
				}
			);
			if (responseData) {
				const { message } = responseData;
				setResponse(message);
			}
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};
	/* Opens a modal with the response. On succes and error navigates back to the login component. */
	const closeModal = () => {
		setResponse(null);
		history.push('/login');
	};

	/* Listens to the isLoading value returned by the useHttpClient hook. Based on this value a loading spinner is presented. */
	if (isLoading) {
		return <LoadingSpinner asOverlay loadingSpinnerMessage="Updating password..." />;
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{response && (
				<Modal
					show={response ? true : false}
					header="Some header"
					onCancel={closeModal}
					footer={
						<IconButton
							icon="cancel"
							buttonType="button"
							before
							inverse
							iconStyle={{ marginRight: '0.5rem' }}
							onClick={closeModal}
						>
							CLOSE
						</IconButton>
					}
				>
					<p>{response}</p>
				</Modal>
			)}

			<div className="pwd-reset-container">
				{!isLoading && (
					<form className="pwd-reset-form" onSubmit={resetPwdHandler}>
						<Header title="Reset password" md center />
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
							icon="send"
							iconSize={24}
							iconColor="#fff"
							disabled={!formState.isValid}
							buttonType="submit"
							iconStyle={{ marginLeft: '.5rem' }}
						>
							RESET
						</IconButton>
					</form>
				)}
			</div>
		</React.Fragment>
	);
};
