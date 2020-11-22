import React from 'react';

import './ImageContainer.scss';

export const ImageContainer = ({ src, alt, onClick }) => {
	return (
		<div onClick={onClick} className="image-contained">
			<img src={src} alt={alt} />
		</div>
	);
};
