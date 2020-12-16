import React, { useEffect } from 'react';

import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL
} from '../../../../shared/util/validators.js';
import { useForm } from '../../../../shared/hooks/form-hook';
import { IconButton } from '../../../../components/uiElements';
import { Input } from '../../../formElements/input/Input';
import { useContextUser } from '../../../../shared/context/user-context';

import './ProfileInfo.scss';

export const ProfileInfo = () => {
	const { currentUser, updateUser } = useContextUser();

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
					value: currentUser.name,
					isValid: true
				},
				email: {
					value: currentUser.email,
					isValid: true
				}
			},
			true
		);
	}, [currentUser, setFormData]);

	const userProfileUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		const newValues = {
			username: formState.inputs.username.value,
			email: formState.inputs.email.value
		};
		updateUser(newValues);
	};

	return (
		<React.Fragment>
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
							initialValue={currentUser.name}
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
							initialValue={currentUser.email}
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
