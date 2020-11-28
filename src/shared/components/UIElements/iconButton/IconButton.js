import React from 'react';

import { Icon } from '../../../../components/Icon/Icon';
import './IconButton.scss';

export const IconButton = ({
	children,
	icon,
	iconSize,
	iconColor,
	iconStyle,
	onClick,
	buttonType,
	disabled,
	iconButtonSize,
	noborder,
	inverse,
	danger,
	before
}) => {
	if (before) {
		return (
			<button
				// className="icon-button"
				className={`icon-button icon-button--${iconButtonSize || 'default'} ${
					inverse && 'icon--button--inverse'
				} ${danger && 'icon--button--danger'} ${noborder && 'icon--button--noborder'}`}
				type={buttonType || 'button'}
				onClick={onClick}
				disabled={disabled}
			>
				<Icon icon={icon} size={iconSize} color={iconColor} style={iconStyle} />
				{children}
			</button>
		);
	} else {
		return (
			<button
				// className="icon-button"
				className={`icon-button icon-button--${iconButtonSize || 'default'} ${
					inverse && 'icon--button--inverse'
				} ${danger && 'icon--button--danger'} ${noborder && 'icon--button--noborder'}`}
				type={buttonType || 'button'}
				onClick={onClick}
				disabled={disabled}
			>
				{children}
				<Icon icon={icon} size={iconSize} color={iconColor} style={iconStyle} />
			</button>
		);
	}
};
