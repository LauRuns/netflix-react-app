import React, { useState, useContext, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	VALIDATOR_OBJECT
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { Button, Card, LoadingSpinner, ErrorModal } from '../../components/uiElements';
import { Input } from '../../components/formElements/input/Input';
import { useAuthentication } from '../../shared/hooks/authentication-hook';
import { UserContext } from '../../shared/context/user-context';
import { CountryDropdown } from '../../components/formElements/countryDropdown/CountryDropdown';

import './LoginPage.scss';

export const LoginPage = () => {
	const { login } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const { setNewCurrentUser } = useContext(UserContext);

	const [countryList, setCountryList] = useState();
	const [isLoginMode, setIsLoginMode] = useState(true);

	const isMounted = useRef(null);

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

	/*
    useEffect to fetch countries needed to set as the users country of destination of interest.
    Based on this country ID the expiring and new data on the /home - landingpage will be loaded.
    The user has the option of changing this in the account settings when logged in.
    */
	useEffect(() => {
		let loadedCountries = [];
		isMounted.current = true;

		const loadCountries = async () => {
			try {
				const { results } = await sendRequest(
					'https://unogsng.p.rapidapi.com/countries',
					'GET',
					null,
					{
						'x-rapidapi-host': 'unogsng.p.rapidapi.com',
						'x-rapidapi-key': process.env.REACT_APP_MOVIES_KEY,
						useQueryString: true
					}
				);
				if (isMounted.current) {
					results.forEach((element) => {
						const newEl = {
							country: element.country.trim(),
							countryId: element.id,
							countrycode: element.countrycode
						};
						loadedCountries.push(newEl);
					});
					if (isMounted.current) {
						setCountryList(loadedCountries);
					}
				}
			} catch (err) {
				// Error is handled by useNetflixClient
			}
		};
		loadCountries();
		return () => {
			isMounted.current = false;
		};
	}, []);

	const switchModeHandler = () => {
		console.log(countryList);
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
					},
					country: {
						value: {},
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

				const { userId, token, user } = responseData;
				await setNewCurrentUser(user);
				await login(userId, token);
				history.push('/home');
			} catch (err) {
				// Error is handled by the useHttpClient hook
			}
		} else {
			try {
				const formData = new FormData();
				formData.append('name', formState.inputs.name.value);
				formData.append('country', JSON.stringify(formState.inputs.country.value));
				formData.append('email', formState.inputs.email.value);
				formData.append('password', formState.inputs.password.value);

				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/users/signup`,
					'POST',
					formData
				);
				const { userId, token, user } = responseData;
				await setNewCurrentUser(user);
				await login(userId, token);

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
				<Card cardStyles={{ padding: '1rem 2rem', background: '#000' }}>
					<div className="authentication__header">
						<h1>{isLoginMode ? 'LOGIN' : 'SIGNUP'}</h1>
					</div>
					<form onSubmit={authSubmitHandler} className="authentication__form">
						{!isLoginMode && !isLoading && (
							<>
								<Input
									element="input"
									id="name"
									type="text"
									validators={[VALIDATOR_REQUIRE()]}
									errorText="Please enter a name"
									onInput={inputHandler}
									placeholder="Username"
									label="Username"
								/>

								<CountryDropdown
									id="country"
									title="Select country"
									label="Set your destination country"
									items={countryList}
									onInput={inputHandler}
									validators={[VALIDATOR_OBJECT()]}
									errorText="Please select a country"
								/>
							</>
						)}
						<Input
							element="input"
							id="email"
							type="email"
							validators={[VALIDATOR_EMAIL()]}
							errorText="Please enter a valid email address."
							onInput={inputHandler}
							placeholder="Email"
							label="Email"
						/>
						<Input
							element="input"
							id="password"
							type="password"
							validators={[VALIDATOR_MINLENGTH(5)]}
							errorText="Please enter a valid password, min 5 characters."
							onInput={inputHandler}
							placeholder="Password"
							label="Password"
						/>
						<Button type="submit" disabled={!formState.isValid}>
							{isLoginMode ? 'LOGIN' : 'SIGNUP'}
						</Button>
					</form>
					<Button noborder onClick={switchModeHandler}>
						switch to {isLoginMode ? 'SIGNUP' : 'LOGIN'}
					</Button>
				</Card>
			</div>
		</React.Fragment>
	);
};
