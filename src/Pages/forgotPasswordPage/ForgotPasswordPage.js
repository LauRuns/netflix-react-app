import React, { useState } from 'react';
/* Hooks and context */
import { VALIDATOR_EMAIL } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
/* UI elements and components */
import { IconButton, ErrorModal, LoadingSpinner, Modal } from '../../components/uiElements';
import { Input } from '../../components/formElements/input/Input';
import { Header } from '../../components/atoms';
/* Styling */
import './ForgotPasswordPage.scss';

export const ForgotPasswordPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [response, setResponse] = useState(null);

	/* Dispatch form validation to the useForm hook */
	const [formState, inputHandler] = useForm(
		{
			email: {
				value: '',
				isValid: false
			}
		},
		false
	);

	/* Send user a mail with a link that enables password reset */
	const resetEmailHandler = async (event) => {
		event.preventDefault();
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/auth/reset`,
				'POST',
				JSON.stringify({
					email: formState.inputs.email.value
				}),
				{
					'Content-Type': 'application/json'
				}
			);
			const { message } = responseData;
			setResponse(message);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};
	/* Closes the modal when the button in the modal is clicked */
	const closeModal = () => setResponse(null);

	if (isLoading) {
		return <LoadingSpinner asOverlay loadingSpinnerMessage="Sending data..." />;
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{response && (
				<Modal
					show={response ? true : false}
					header="Recovery mail was send"
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
				<form className="send-reset-email-form" onSubmit={resetEmailHandler}>
					<Header title="Recover password" md center>
						<p>Don't worry, it happens to the best of us.</p>
					</Header>
					<div>
						<Input
							id="email"
							element="input"
							label="Enter your email"
							placeholder="Email"
							validators={[VALIDATOR_EMAIL]}
							errorText="Please enter a valid email"
							onInput={inputHandler}
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
						Email me a recovery link
					</IconButton>
				</form>
			</div>
		</React.Fragment>
	);
};
