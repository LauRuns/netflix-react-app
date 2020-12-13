import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Button, Card, LoadingSpinner, ErrorModal } from '../../components/uiElements';
import { Input } from '../../components/formElements/input/Input';
import { useAuthentication } from '../../shared/hooks/authentication-hook';

import './LoginPage.scss';

export const LoginPage = () => {
	const { login } = useAuthentication();

	const [isLoginMode, setIsLoginMode] = useState(true);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler, setFormData] = useForm(
		{
			email: {
				value: '',
				isValid: false
			},
			password: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const history = useHistory();

	const switchModeHandler = () => {
		if (!isLoginMode) {
			setFormData(
				{
					...formState.inputs,
					name: undefined
				},
				formState.inputs.email.isValid && formState.inputs.password.isValid
			);
		} else {
			setFormData(
				{
					...formState.inputs,
					name: {
						value: '',
						isValid: false
					}
				},
				false
			);
		}
		setIsLoginMode((prevMode) => !prevMode);
	};

	const authSubmitHandler = async (event) => {
		event.preventDefault();

		if (isLoginMode) {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/users/login`,
					'POST',
					JSON.stringify({
						email: formState.inputs.email.value,
						password: formState.inputs.password.value
					}),
					{
						'Content-Type': 'application/json'
					}
				);

				const {
					userId,
					token,
					user: { country }
				} = responseData;

				await login(userId, token, country);
				history.push('/home');
			} catch (err) {
				// Error is handled by the useHttpClient hook
			}
		} else {
			try {
				const formData = new FormData();
				formData.append('email', formState.inputs.email.value);
				formData.append('name', formState.inputs.name.value);
				formData.append('password', formState.inputs.password.value);

				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/users/signup`,
					'POST',
					formData
				);

				await login(responseData.userId, responseData.token);
				history.push('/home');
			} catch (err) {
				// Error is handled by the useHttpClient hook
			}
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="backgroundContainer" />

			{isLoading && <LoadingSpinner asOverlay loadingSpinnerMessage="Logging in..." />}
			<div className="authentication__container">
				<Card login>
					<div className="authentication__header">
						<h1>Login</h1>
					</div>
					<form onSubmit={authSubmitHandler} className="authentication__form">
						{!isLoginMode && (
							<Input
								element="input"
								id="name"
								type="text"
								validators={[VALIDATOR_REQUIRE()]}
								errorText="Please enter a name"
								onInput={inputHandler}
								placeholder="Username"
							/>
						)}
						<Input
							element="input"
							id="email"
							type="email"
							validators={[VALIDATOR_EMAIL()]}
							errorText="Please enter a valid email address."
							onInput={inputHandler}
							placeholder="Email"
						/>
						<Input
							element="input"
							id="password"
							type="password"
							validators={[VALIDATOR_MINLENGTH(5)]}
							errorText="Please enter a valid password, min 5 characters."
							onInput={inputHandler}
							placeholder="Password"
						/>
						<Button type="submit" disabled={!formState.isValid}>
							{isLoginMode ? 'LOGIN' : 'SIGNUP'}
						</Button>
					</form>
					<Button inverse onClick={switchModeHandler}>
						SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIIN'}
					</Button>
				</Card>
			</div>
		</React.Fragment>
	);
};
