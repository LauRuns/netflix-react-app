import React from 'react';

import { useHttpClient } from '../../../../shared/hooks/http-hook';
import { useForm } from '../../../../shared/hooks/form-hook';
import { IconButton, LoadingSpinner, ErrorModal } from '../../../uiElements';
import { ImageUpload } from '../../../formElements/imageUpload/ImageUpload';
import { useAuthentication } from '../../../../shared/hooks/authentication-hook';

import './UploadImage.scss';

export const UploadImage = (props) => {
	const { token, userId } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [formState, inputHandler] = useForm(
		{
			image: {
				value: null,
				isValid: false
			}
		},
		false
	);

	const userUploadImgHandler = async (event) => {
		event.preventDefault();
		try {
			const formData = new FormData();
			formData.append('username', props.username);
			formData.append('email', props.email);
			formData.append('image', formState.inputs.image.value);

			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${userId}`,
				'PATCH',
				formData,
				{
					Authorization: `Bearer ${token}`
				}
			);
			// history.push('/account');
			if (responseData) {
				console.log(responseData);
				props.setUpdatedUserAvatar(responseData.updatedUser);
			}
		} catch (err) {
			// Errors are handled by the useHttpClient method
		}
	};

	if (isLoading) {
		return <LoadingSpinner asOverlay loadingSpinnerMessage="Uploading image..." />;
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="img-upload-container">
				<form className="img-form" onSubmit={userUploadImgHandler}>
					<h3>{formState.isValid ? 'For real?? This image??!' : 'Set your user avatar!'}</h3>
					<div>
						<ImageUpload id="image" onInput={inputHandler} />
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
						SAVE IMAGE
					</IconButton>
				</form>
			</div>
		</React.Fragment>
	);
};
