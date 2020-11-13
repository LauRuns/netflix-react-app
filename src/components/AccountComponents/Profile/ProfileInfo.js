import React, { useEffect, useContext } from 'react';

import Input from '../../../shared/components/FormElements/Input/Input';
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL
} from '../../../shared/util/validators';
import { useForm } from '../../../shared/hooks/form-hook';
import Button from '../../../shared/components/UIElements/Button/Button';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';

import './ProfileInfo.scss';

const ProfileInfo = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [formState, inputHandler, setFormData] = useForm(
		{
			username: {
				value: '',
				isValid: false
			},
			email: {
				value: '',
				isValid: false
			}
		},
		false
	);

	useEffect(() => {
		setFormData(
			{
				username: {
					value: props.username,
					isValid: true
				},
				email: {
					value: props.email,
					isValid: true
				}
			},
			true
		);
	}, [props, setFormData]);

	const userProfileUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${auth.userId}`,
				'PATCH',
				JSON.stringify({
					username: formState.inputs.username.value,
					email: formState.inputs.email.value,
					country: props.country
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);
			onUpdate(responseData.updatedUser);
		} catch (err) {
			// Error is handled by the useHttpClient
		}
	};

	const onUpdate = (event) => {
		props.setUpdatedUserData(event);
	};

	if (isLoading) {
		return (
			<div className="center">
				<LoadingSpinner loadingSpinnerMessage="Updating..." />
			</div>
		);
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="profile-info-container">
				<form className="profile-form" onSubmit={userProfileUpdateSubmitHandler}>
					<div>
						<Input
							id="username"
							element="input"
							label="Edit username"
							validators={[VALIDATOR_MAXLENGTH(20), VALIDATOR_MINLENGTH(5)]}
							errorText="Please enter a valid namelength"
							onInput={inputHandler}
							initialValue={props.username}
							initialValid
						/>
					</div>
					<div>
						<Input
							id="email"
							element="input"
							label="Edit email"
							validators={[VALIDATOR_EMAIL]}
							errorText="Please enter a valid email"
							onInput={inputHandler}
							initialValue={props.email}
							initialValid
						/>
					</div>
					<Button type="submit" disabled={!formState.isValid}>
						UPDATE PROFILE
					</Button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default ProfileInfo;
