import React from 'react';

import './Header.scss';

export const Header = ({ children, center, md, lg, xl }) => {
	return (
		<div
			className={`header-item ${center && 'header-center'} ${md && 'header-medium'} ${
				lg && 'header-large'
			} ${xl && 'header-x-large'}`}
		>
			{children}
		</div>
	);
};
