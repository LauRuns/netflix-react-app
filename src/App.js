import React from 'react';

import { MainNavigation } from './pages';
import { Routes } from './routes/Routes';

// import { AuthContext } from './shared/context/auth-context';
// import useAuth from './shared/hooks/auth-hook';

import './App.scss';

export const App = () => {
	// const { token, login, logout, updateCountry, userId, userCountry } = useAuth();
	// let routes;

	// routes = (
	// 	<Switch>
	// 		<Route path="/login" exact component={LoginPage} />
	// 		<PrivateRoute path="/home" exact>
	// 			<LandingPage />
	// 		</PrivateRoute>
	// 		<PrivateRoute path="/countries" exact>
	// 			<CountriesPage />
	// 		</PrivateRoute>
	// 		<PrivateRoute path="/countryinfo/:countryId/:countryName" exact>
	// 			<CountryDetailPage />
	// 		</PrivateRoute>
	// 		<PrivateRoute path="/search" exact>
	// 			<SearchPage />
	// 		</PrivateRoute>
	// 		<PrivateRoute path="/account/:userId" exact>
	// 			<AccountPage />
	// 		</PrivateRoute>
	// 		<PrivateRoute>
	// 			<PageNotFound />
	// 		</PrivateRoute>
	// 	</Switch>
	// );

	// if (token) {
	// 	routes = (
	// 		<Switch>
	// 			<Route path="/countries" exact component={CountriesPage} />
	// 			<Route path="/account/:userId" exact component={AccountPage} />
	// 			<Route path="/countryinfo/:countryId/:countryName" exact component={CountryDetailPage} />
	// 			<Route path="/search" exact component={SearchPage} />
	// 			<Route path="/home" exact component={LandingPage} />
	// 			<Route component={PageNotFound} />
	// 		</Switch>
	// 	);
	// } else {
	// 	console.log('Redirecting');
	// 	routes = (
	// 		<Switch>
	// 			<Route path="/login" exact component={LoginPage} />
	// 			<Route component={PageNotFound} />
	// 		</Switch>
	// 	);
	// }

	return (
		<>
			<MainNavigation />
			<div className="main-content">
				<Routes />
			</div>
		</>

		// <AuthContext.Provider
		// 	value={{
		// 		isLoggedIn: !!token,
		// 		token: token,
		// 		userId: userId,
		// 		country: userCountry,
		// 		login: login,
		// 		logout: logout,
		// 		updateCountry: updateCountry
		// 	}}
		// >
		// 	<MainNavigation />
		// 	<div className="content">{routes}</div>
		// </AuthContext.Provider>
	);
};
