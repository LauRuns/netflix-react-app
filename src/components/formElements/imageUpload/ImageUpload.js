import React, { useRef, useState, useEffect } from 'react';
/* UI elements and styling */
import { IconButton } from '../../uiElements';
import './ImageUpload.scss';

/* Comonent for handling the selection of a file - image */
export const ImageUpload = (props) => {
	const [file, setFile] = useState();
	const [previewUrl, setPreviewUrl] = useState();
	const [isValid, setIsValid] = useState(false);

	const filePickerRef = useRef();

	/* Acts when a file is selected and renders a preview */
	useEffect(() => {
		if (!file) {
			return;
		}
		const fileReader = new FileReader();
		fileReader.onload = () => {
			setPreviewUrl(fileReader.result);
		};
		fileReader.readAsDataURL(file);
	}, [file]);

	/* Handles the selected file */
	const pickedHandler = (event) => {
		let pickedFile;
		let fileIsValid = isValid;

		if (event.target.files && event.target.files.length === 1) {
			pickedFile = event.target.files[0];
			setFile(pickedFile);
			setIsValid(true);
			fileIsValid = true;
		} else {
			setIsValid(false);
			fileIsValid = false;
		}
		props.onInput(props.id, pickedFile, fileIsValid);
	};

	/*
    Is a reference to the input element that is not displayed.
    The button calling this function forwards the event to the hidden input, triggering the opening of the device files.
    This allows the user to select an image.
    */
	const pickImageHandler = () => {
		filePickerRef.current.click();
	};

	return (
		<div className="img-upload-form-control">
			<input
				id={props.id}
				ref={filePickerRef}
				style={{ display: 'none' }}
				type="file"
				accept=".jpg,.png,.jpeg" // accept only images
				onChange={pickedHandler}
			/>
			<div className={`image-upload ${props.center && 'center'}`}>
				<div className="image-upload__preview">
					{previewUrl && <img src={previewUrl} alt="Preview" />}
					{!previewUrl && <p>Please select an image.</p>}
				</div>
				<IconButton
					icon="search"
					iconSize={24}
					iconColor="#fff"
					before
					iconStyle={{ marginRight: '.5rem' }}
					onClick={pickImageHandler}
				>
					SELECT IMAGE
				</IconButton>
			</div>
			{!isValid && <p>{props.errorText}</p>}
		</div>
	);
};
