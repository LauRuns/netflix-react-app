import React from 'react';

import './Avatar.css';

const Avatar = (props) => {
	const onImgErrorHandler = () => {
		console.log('User Avatar has an error');
	};

	return (
		<div className={`avatar ${props.className}`} style={props.style}>
			<img
				onError={onImgErrorHandler}
				// src={props.image ? props.image : './no-profile-picture.jpg'}
				src={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
				alt={props.alt}
				style={{ width: props.width, height: props.height }}
			/>
		</div>
	);
};

export default Avatar;
