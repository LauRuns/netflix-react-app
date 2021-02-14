import React from 'react';
import defaultAvatar from '../../../assets/no-profile-picture.jpg';
import './Avatar.scss';

/*
Returns a container for the user image, returning a circle shaped image.
If the user has no image set, then a default image is used as a fallback.
*/
export const Avatar = (props) => {
	const handleImageError = (ev) => {
		ev.target.src = defaultAvatar;
	};

	return (
		<div className={`avatar ${props.className}`} style={props.style}>
			<img
				src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
				onError={handleImageError}
				alt={props.alt}
				style={{ width: props.width, height: props.height }}
			/>
		</div>
	);
};
