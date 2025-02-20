import React from 'react';
import iconPath from '../../../assets/iconslib';
import './Icon.scss';

const defaultStyles = { display: 'inline-block', verticalAlign: 'middle' };

export const Icon = ({ icon, size, color, className, style, onClick, disabled }) => {
	const defaultSvg = {
		size: 16,
		color: '#fff',
		viewBox: '0 0 24 24',
		style: {},
		className: ''
	};

	const styles = { ...defaultStyles, ...style };
	return (
		<svg
			className={className}
			style={styles}
			viewBox="0 0 24 24"
			width={`${size || defaultSvg.size}px`}
			height={`${size || defaultSvg.size}px`}
			onClick={onClick}
		>
			<path fill={disabled ? `gray` : color || defaultSvg.color} d={iconPath[icon]} />
		</svg>
	);
};
