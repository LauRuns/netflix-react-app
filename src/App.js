import React from 'react';
import {
	Route,
	// Redirect,
	Switch
} from 'react-router-dom';

import MainNavigation from './Pages/MainNavigation/MainNavigation';
import Auth from './Pages/AuthPage/Auth';
import { CountriesPage } from './Pages/CountriesPage/CountriesPage';
import { CountryDetailPage } from './components/countryDetailPage/CountryDetailPage';

import SearchPage from './Pages/SearchPage/SearchPage';
import { UserAccount } from './Pages/Account/Account';
import LandingPage from './Pages/LandingPage/LandingPage';
import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';

import './App.scss';

const App = () => {
	const { token, login, logout, updateCountry, userId, userCountry } = useAuth();

	let routes;

	// use this with token verification
	if (token) {
		routes = (
			<Switch>
				<Route path="/auth" exact component={Auth} />
				<Route path="/countries" exact component={CountriesPage} />
				<Route path="/account" exact component={UserAccount} />
				<Route path="/countryinfo" exact component={CountryDetailPage} />
				<Route path="/search" exact component={SearchPage} />
				<Route path="/home" exact component={LandingPage} />
			</Switch>
		);
	} else {
		routes = (
			<Switch>
				<Route path="/auth" exact component={Auth} />
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
