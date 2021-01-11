import React from 'react';
import { Route, Redirect } from 'react-router-dom';
/* Hook imports */
import { useAuthentication } from '../hooks/authentication-hook';
/*
Checks if the user is authenticated using the useAuthentication hook.
If the user !authenticated then redirect to the /login page
If the user is authenticated then continue to the requested page
*/
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
