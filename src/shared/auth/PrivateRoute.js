import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useCookies } from 'react-cookie';

/*
Checks if the user is authenticated using the useAuthState context.
If the user !authenticated then redirect to the /login page
If the user is authenticated then continue to the requested page
*/
export const PrivateRoute = ({ children, ...rest }) => {
	const [cookies] = useCookies(['token', 'userId', 'expDate']);

	return (
		<Route
			{...rest}
			render={({ location }) =>
				cookies.token ? (
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
