import React from 'react';
/* Components and styling */
import { Icon } from '../../atoms';
import './IconButton.scss';

/*
Returns a button that holds a Icon.
Based on the 'before' prop, the icon is set before or after the button text.
Takes in additional styling properties and forwards the onClick action
*/
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
				className={`icon-button icon-button--${iconButtonSize || 'default'} ${
					inverse && 'icon--button--inverse'
				} ${danger && 'icon--button--danger'} ${noborder && 'icon--button--noborder'}`}
				type={buttonType || 'button'}
				onClick={onClick}
				disabled={disabled}
			>
				<Icon
					icon={icon}
					size={iconSize || 24}
					color={iconColor || '#fff'}
					style={iconStyle}
					disabled={disabled}
				/>
				{children}
			</button>
		);
	} else {
		return (
			<button
				className={`icon-button icon-button--${iconButtonSize || 'default'} ${
					inverse && 'icon--button--inverse'
				} ${danger && 'icon--button--danger'} ${noborder && 'icon--button--noborder'}`}
				type={buttonType || 'button'}
				onClick={onClick}
				disabled={disabled}
			>
				{children}
				<Icon
					icon={icon}
					size={iconSize || 24}
					color={iconColor || '#fff'}
					style={iconStyle}
					disabled={disabled}
				/>
			</button>
		);
	}
};
