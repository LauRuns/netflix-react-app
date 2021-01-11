import React from 'react';
/* Hooks and context */
import { useForm } from '../../../../shared/hooks/form-hook';
import { useContextUser } from '../../../../shared//context/user-context';
/* UI elements and components */
import { IconButton } from '../../../uiElements';
import { ImageUpload } from '../../../formElements/imageUpload/ImageUpload';
/* Styling */
import './UploadImage.scss';

/* Component for handling changing the users avatar */
export const UploadImage = () => {
	const { updateUserImg } = useContextUser();

	/* Checks the form if an image is selected */
	const [formState, inputHandler] = useForm(
		{
			image: {
				value: null,
				isValid: false
			}
		},
		false
	);

	/* Forwards the selected image to updateImageHandler in useContextUser (context) */
	const userUploadImgHandler = async (event) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append('image', formState.inputs.image.value);
		updateUserImg(formData);
	};

	return (
		<React.Fragment>
			<div className="img-upload-container">
				<form className="img-form" onSubmit={userUploadImgHandler}>
					<h3>{formState.isValid ? null : 'Set your user avatar!'}</h3>
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
