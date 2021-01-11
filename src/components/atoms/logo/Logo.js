import React from 'react';
import './Logo.scss';

const defaultStyles = { display: 'inline-block', verticalAlign: 'middle' };

export const Logo = ({ logoSource, altLogo, size, style, onClick }) => {
	const defaultLogo = {
		size: 16,
		viewBox: '0 0 24 24',
		style: {},
		className: ''
	};
	const styles = { ...defaultStyles, ...style };
	return (
		<div className="logo-component-container">
			<img
				src={logoSource}
				alt={altLogo}
				style={styles}
				width={`${size || defaultLogo.size}px`}
				height={`${size || defaultLogo.size}px`}
				onClick={onClick}
			/>
		</div>
	);
};
