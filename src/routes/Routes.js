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
	SearchResultsPage
} from '../pages';

export const Routes = () => {
	return (
		<Switch>
			<Route path="/login" exact component={LoginPage} />
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
			<PrivateRoute
				// path="/search?title=:title&start_year=:start_year&end_year=:end_year&content_type=:content_type&country=:countryId"
				path="/search/results"
				exact
			>
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
