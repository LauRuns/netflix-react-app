import React from 'react';
import {
	Route,
	// Redirect,
	Switch
} from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import CountriesPageContainer from './containers/CountriesPage/CountriesPageContainer';
import CountryDetailPage from './containers/CountriesPage/CountryDetailPage/CountryDetailPage';
import SearchPage from './containers/SearchPage/SearchPage';
import Account from './containers/Account/Account';
import Layout from './containers/layouts/Layout';
import { AuthContext } from './shared/context/auth-context';
import useAuth from './shared/hooks/auth-hook';

import './App.scss';

const App = () => {
	const { token, login, logout, userId } = useAuth();

	let routes;

	// use this with token verification
	if (token) {
		routes = (
			<Switch>
				<Route path="/auth" exact component={Auth} />
				<Route path="/" exact component={CountriesPageContainer} />
				<Route path="/account" exact component={Account} />
				<Route path="/countryinfo" exact component={CountryDetailPage} />
				<Route path="/search" exact component={SearchPage} />
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
				login: login,
				logout: logout
			}}
		>
			<Layout />
			<div className="content">{routes}</div>

			{/* </Layout> */}
		</AuthContext.Provider>
	);
};

export default App;
