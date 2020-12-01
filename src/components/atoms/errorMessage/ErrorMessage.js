import React from 'react';

export const ErrorMessage = ({ children }) => {
	return <p style={{ backgroundColor: 'red', color: '#fff', fontWeight: 300 }}>{children}</p>;
};
