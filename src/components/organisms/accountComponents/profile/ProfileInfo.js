import React, { useEffect } from 'react';
/* Hooks, context and validators */
import {
	VALIDATOR_MAXLENGTH,
	VALIDATOR_MINLENGTH,
	VALIDATOR_EMAIL
} from '../../../../shared/util/validators.js';
import { useForm } from '../../../../shared/hooks/form-hook';
import { useContextUser } from '../../../../shared/context/user-context';
/* UI elemensts and omponents */
import { IconButton } from '../../../../components/uiElements';
import { Input } from '../../../formElements/input/Input';
/* Styling */
import './ProfileInfo.scss';

/* Component for handling changing the user email and username */
export const ProfileInfo = () => {
	const { currentUser, updateUser } = useContextUser();

	/* Checks form validity based on inputs */
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

	/* Sets the initial form values to the current email and username */
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

	/* Forwards the values for updating to the user context */
	const userProfileUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		const newValues = {
			username: formState.inputs.username.value,
			email: formState.inputs.email.value
		};
		await updateUser(newValues);
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
							validators={[VALIDATOR_MAXLENGTH(30), VALIDATOR_MINLENGTH(5)]}
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
