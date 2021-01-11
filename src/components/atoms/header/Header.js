import React from 'react';
import './Header.scss';

const defaultHeader = { display: 'flex' };

export const Header = ({ children, center, md, lg, xl, style, title, headerActions }) => {
	const styles = { ...defaultHeader, ...style };
	return (
		<div
			className={`header-item ${center && 'header-center'} ${md && 'header-medium'} ${
				lg && 'header-large'
			} ${xl && 'header-x-large'}`}
			style={styles}
		>
			{title && <h2>{title}</h2>}
			<div className="header-sub-head">{children}</div>
			<div className="header-actions">{headerActions}</div>
		</div>
	);
};
