import React, { useState } from 'react';
import defaultAvatar from '../../../assets/no-profile-picture.jpg';
import './Avatar.scss';

/*
Returns a container for the user image, returning a circle shaped image.
If the user has no image set, then a default image is used as a fallback.
*/
export const Avatar = (props) => {
	const [loadedImg, setLoadedImg] = useState({ imageStatus: 'loading', error: false });

	const handleImageError = () => {
		setLoadedImg({ imageStatus: 'failed to load', error: true });
	};

	return (
		<div className={`avatar ${props.className}`} style={props.style}>
			<img
				src={loadedImg.error ? defaultAvatar : `${process.env.REACT_APP_ASSET_URL}/${props.image}`}
				onError={handleImageError}
				alt={loadedImg.imageStatus}
				style={{ width: props.width, height: props.height }}
			/>
		</div>
	);
};
