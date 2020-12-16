import React from 'react';

import { useForm } from '../../../../shared/hooks/form-hook';
import { IconButton } from '../../../uiElements';
import { ImageUpload } from '../../../formElements/imageUpload/ImageUpload';
import { useContextUser } from '../../../../shared//context/user-context';

import './UploadImage.scss';

export const UploadImage = () => {
	const { updateUserImg } = useContextUser();

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
		const formData = new FormData();
		formData.append('image', formState.inputs.image.value);
		updateUserImg(formData);
	};

	return (
		<React.Fragment>
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
