import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useHistory, Link } from 'react-router-dom';

/* Hooks and context */
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	VALIDATOR_OBJECT
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthState } from '../../shared/context/auth-context';
/* UI elements and components */
import { Button, Card, LoadingSpinner, ErrorModal } from '../../components/uiElements';
import { Input } from '../../components/formElements/input/Input';
import { useContextUser } from '../../shared/context/user-context';
import { CountryDropdown } from '../../components/formElements/countryDropdown/CountryDropdown';
/* Styling */
import './LoginPage.scss';

/* Presents the login / sign up page */
export const LoginPage = () => {
	const { login } = useAuthState();
	const { setActiveUserHandler } = useContextUser();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [countryList, setCountryList] = useState();
	const [isLoginMode, setIsLoginMode] = useState(true);
	const history = useHistory();
	const isMounted = useRef(null);

	/* Dispatches the form validation to the useForm hooks */
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

	/* Loads a list of all available countries by the api. When a new user signs up, then this list will be presented in a dropdown. */
	const loadCountries = useCallback(async () => {
		let loadedCountries = [];
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
	}, [sendRequest]);

	/*
    useEffect to fetch countries needed to set as the users country of destination or country of interest.
    Based on this country ID the expiring and new data on the /home (landingpage after Sign Up) will be loaded.
    The user has the option of changing this in the account settings when Sign Up in.
    */
	useEffect(() => {
		isMounted.current = true;
		if (!isLoginMode) {
			loadCountries();
		}
		return () => {
			isMounted.current = false;
		};
	}, [isLoginMode, loadCountries]);

	/*
    Allows switching betweens Login and Sign Up.
    Component state (a boolean) is adjusted accordingly rendering a different form.
    */
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

	/* Submits the Login or Sign Up user data depending on the isLoginMode state. */
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
				await setActiveUserHandler(user);
				await login(userId, token);
				history.push(`/home/${user.country.countryId}/${user.country.country}`);
			} catch (err) {
				// Error is handled by the useHttpClient hook
			}
		} else {
			if (formState.inputs.password.value !== formState.inputs.confirmpassword.value) {
				return alert('Password and the confirm password do not match!');
			}
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
				await setActiveUserHandler(user);
				await login(userId, token);
				history.push(`/home/${user.country.countryId}/${user.country.country}`);
			} catch (err) {
				// Error is handled by the useHttpClient hook
			}
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="backgroundContainer" />

			{isLoading && <LoadingSpinner asOverlay loadingSpinnerMessage="Loading..." />}
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
						{!isLoginMode && !isLoading && (
							<Input
								element="input"
								id="confirmpassword"
								type="password"
								validators={[VALIDATOR_MINLENGTH(5)]}
								errorText="Please confirm your password."
								onInput={inputHandler}
								placeholder="Confirm password"
								label="Confirm password"
							/>
						)}
						{!isLoginMode && (
							<div className="terms-conditions">
								<Link to="/terms_and_conditions">
									By signing up you agree to our <b>Terms of service</b> and <b>Privacy policy</b>
								</Link>
							</div>
						)}
						{isLoginMode && (
							<div className="forgot-password">
								<Link to="/reset">Forgot password?</Link>
							</div>
						)}
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
