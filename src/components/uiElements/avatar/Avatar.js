import React from 'react';
import defaultAvatar from '../../../assets/no-profile-picture.jpg';
import './Avatar.scss';

export const Avatar = (props) => {
	const onImgErrorHandler = () => {
		console.log('User Avatar has an error');
	};

	return (
		<div className={`avatar ${props.className}`} style={props.style}>
			<img
				onError={onImgErrorHandler}
				src={props.image ? `${process.env.REACT_APP_ASSET_URL}/${props.image}` : defaultAvatar}
				alt={props.alt}
				style={{ width: props.width, height: props.height }}
			/>
		</div>
	);
};
