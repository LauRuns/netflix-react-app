import React from 'react';
import { Route, Redirect } from 'react-router-dom';
/* Hook/context imports */
import { useAuthState } from '../context/auth-context';
/*
Checks if the user is authenticated using the useAuthState context.
If the user !authenticated then redirect to the /login page
If the user is authenticated then continue to the requested page
*/
export const PrivateRoute = ({ children, ...rest }) => {
	const data = localStorage.getItem('tokenData');

	return (
		<Route
			{...rest}
			render={({ location }) =>
				data ? (
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
