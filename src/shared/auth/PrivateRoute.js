import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { useAuthentication } from '../hooks/authentication-hook';

export const PrivateRoute = ({ children, ...rest }) => {
	const { isAuthenticated } = useAuthentication();
	return (
		<Route
			{...rest}
			render={({ location }) =>
				isAuthenticated ? (
					children
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: location }
						}}
					/>
				)
			}
		/>
	);
};
