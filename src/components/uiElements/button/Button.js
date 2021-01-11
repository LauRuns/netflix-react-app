import React from 'react';
import { Link } from 'react-router-dom';
import './Button.scss';

/*
Returns a button and takes in addiotional props to set the type and styling for the button.
*/
export const Button = (props) => {
	if (props.href) {
		return (
			<a
				className={`button button--${props.size || 'default'} ${
					props.inverse && 'button--inverse'
				} ${props.danger && 'button--danger'}`}
				href={props.href}
			>
				{props.children}
			</a>
		);
	}
	if (props.to) {
		return (
			<Link
				to={props.to}
				exact={props.exact}
				className={`button button--${props.size || 'default'} ${
					props.inverse && 'button--inverse'
				} ${props.danger && 'button--danger'}`}
			>
				{props.children}
			</Link>
		);
	}
	return (
		<button
			className={`button button--${props.size || 'default'} ${props.inverse && 'button--inverse'} ${
				props.danger && 'button--danger'
			} ${props.noborder && 'button--noborder'}`}
			type={props.type || 'button'}
			onClick={props.onClick}
			disabled={props.disabled}
		>
			{props.children}
		</button>
	);
};
