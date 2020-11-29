import React from 'react';

import './ImageContainer.scss';

const defaultStyles = { display: 'inline-block', verticalAlign: 'middle' };

export const ImageContainer = ({ src, alt, onClick, style, imgSize, className }) => {
	const defaultImg = {
		size: 32,
		style: {},
		className: ''
	};

	const styles = { ...defaultStyles, ...style };
	return (
		<div
			onClick={onClick}
			style={styles}
			className={`image-contained ${className}`}
			width={`${imgSize || defaultImg.size}px`}
			height={`${imgSize || defaultImg.size}px`}
		>
			<img src={src} alt={alt} />
		</div>
	);
};
