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
	const { activeUser, updateUserHandler } = useContextUser();

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
					value: activeUser.user.userName,
					isValid: true
				},
				email: {
					value: activeUser.user.email,
					isValid: true
				}
			},
			true
		);
	}, [activeUser, setFormData]);

	/* Forwards the values for updating to the user context */
	const userProfileUpdateSubmitHandler = async (event) => {
		event.preventDefault();
		const newValues = {
			username: formState.inputs.username.value,
			email: formState.inputs.email.value
		};
		await updateUserHandler(newValues);
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
							initialValue={activeUser.user.userName}
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
							initialValue={activeUser.user.email}
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
