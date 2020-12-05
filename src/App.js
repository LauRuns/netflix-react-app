import React from 'react';
import {
	Route,
	// Redirect,
	Switch
} from 'react-router-dom';

import {
	AccountPage,
	LoginPage,
	CountryDetailPage,
	LandingPage,
	CountriesPage,
	MainNavigation,
	SearchPage
} from './pages';

import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';

import './App.scss';

const App = () => {
	const { token, login, logout, updateCountry, userId, userCountry } = useAuth();
	let routes;

	if (token) {
		routes = (
			<Switch>
				<Route path="/auth" exact component={LoginPage} />
				<Route path="/countries" exact component={CountriesPage} />
				<Route path="/account" exact component={AccountPage} />
				<Route path="/countryinfo" exact component={CountryDetailPage} />
				<Route path="/search" exact component={SearchPage} />
				<Route path="/home" exact component={LandingPage} />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/auth" exact component={LoginPage} />
			</Switch>
		);
	}

	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token: token,
				userId: userId,
				country: userCountry,
				login: login,
				logout: logout,
				updateCountry: updateCountry
			}}
		>
			<MainNavigation />
			<div className="content">{routes}</div>
		</AuthContext.Provider>
	);
};

export default App;
