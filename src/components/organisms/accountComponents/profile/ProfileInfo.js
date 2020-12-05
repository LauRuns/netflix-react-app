import React, { useEffect, useContext } from 'react';

import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL
} from '../../../../shared/util/validators.js';
import { useForm } from '../../../../shared/hooks/form-hook';
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import { AuthContext } from '../../../../shared/context/auth-context';
import { IconButton, ErrorModal, LoadingSpinner } from '../../../../components/uiElements';
import { Input } from '../../../formElements/input/Input';
import './ProfileInfo.scss';

export const ProfileInfo = (props) => {
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
				<LoadingSpinner asOverlay loadingSpinnerMessage="Updating..." />
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
					<IconButton
						icon="save"
						iconSize={24}
						iconColor="#fff"
						disabled={!formState.isValid}
						buttonType="submit"
						before
						iconStyle={{ marginRight: '.5rem' }}
					>
						SAVE
					</IconButton>
				</form>
			</div>
		</React.Fragment>
	);
};
