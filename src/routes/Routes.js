import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from '../shared/auth/PrivateRoute';
import {
	LandingPage,
	CountriesPage,
	CountryDetailPage,
	SearchPage,
	AccountPage,
	PageNotFound,
	LoginPage,
	SearchResultsPage,
	TermsAndConditions,
	ForgotPasswordPage,
	PasswordResetPage
} from '../pages';

/*
Returns all the routes available for the app.
All routes that require authentication are wrapped in the PrivateRoute tag.
When the url is directly manipulated by the user with no matching route, the app will fall back on the wild card '*' route, returning a 404 page.
*/
export const Routes = () => {
	return (
		<Switch>
			<Route path="/login" exact component={LoginPage} />
			<Route path="/terms_and_conditions" exact component={TermsAndConditions} />
			<Route path="/reset" exact component={ForgotPasswordPage} />
			<Route path="/reset/:token" exact component={PasswordResetPage} />
			<PrivateRoute path="/home" exact>
				<LandingPage />
			</PrivateRoute>
			<PrivateRoute path="/countries" exact>
				<CountriesPage />
			</PrivateRoute>
			<PrivateRoute path="/countryinfo/:countryId/:countryName" exact>
				<CountryDetailPage />
			</PrivateRoute>
			<PrivateRoute path="/search" exact>
				<SearchPage />
			</PrivateRoute>
			<PrivateRoute path="/search/results" exact>
				<SearchResultsPage />
			</PrivateRoute>
			<PrivateRoute path="/account/:userId" exact>
				<AccountPage />
			</PrivateRoute>
			<PrivateRoute path="*">
				<PageNotFound />
			</PrivateRoute>
		</Switch>
	);
};
