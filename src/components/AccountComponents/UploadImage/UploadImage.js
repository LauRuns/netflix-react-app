import React, { useContext } from 'react';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import { useForm } from '../../../shared/hooks/form-hook';
import ImageUpload from '../../../shared/components/FormElements/ImageUpload/ImageUpload';
import Button from '../../../shared/components/UIElements/Button/Button';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import './UploadImage.css';

const UploadImage = (props) => {
	const auth = useContext(AuthContext); // sets up listener to changing values for entire app
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
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${auth.userId}`,
				'PATCH',
				formData,
				{
					Authorization: `Bearer ${auth.token}`
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

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="img-upload-container">
				<form className="img-form" onSubmit={userUploadImgHandler}>
					{isLoading && <LoadingSpinner asOverlay />}
					<h3>{formState.isValid ? 'For real?? This image??!' : 'Set your user avatar!'}</h3>
					<ImageUpload
						center
						id="image"
						onInput={inputHandler}
						errorText="Please provide an image"
					/>
					<Button type="submit" disabled={!formState.isValid}>
						SAVE IMAGE
					</Button>
				</form>
			</div>
		</React.Fragment>
	);
};

export default UploadImage;
