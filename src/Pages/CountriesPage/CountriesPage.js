import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { ErrorModal, LoadingSpinner } from '../../components/uiElements';
import { Header } from '../../components/atoms';
import { Search, CountryList } from '../../components/organisms';

import { testCountryList } from '../../assets/testitems';
import './CountriesPage.scss';

export const CountriesPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const isMounted = useRef(null);
	const history = useHistory();

	const [loadedCountries, setLoadedCountries] = useState();
	const [countryListData, setCountryListData] = useState();

	useEffect(() => {
		isMounted.current = true;
		const fetchCountries = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
				);
				if (isMounted.current) {
					setLoadedCountries(responseData.results);
					setCountryListData(responseData.results);
				}
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};
		fetchCountries();
		return () => {
			isMounted.current = false;
		};
	}, []);

	const filteredCountriesHandler = (filteredCountries) => {
		if (filteredCountries && filteredCountries.length !== 0) {
			setCountryListData(filteredCountries);
		} else {
			setCountryListData(loadedCountries);
		}
	};

	const onCountryClickedHandler = (data) => {
		const { name, countryId } = data;
		history.push('/countryinfo', { name, countryId });
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{isLoading ? (
				<LoadingSpinner center loadingSpinnerMessage="Loading data..." asOverlay />
			) : (
				<div className="country-page-container">
					{loadedCountries && (
						<div id="country-page-header" className="country-page__header">
							<Header md style={{ flexDirection: 'column' }}>
								<h1>There is Netflix data for {loadedCountries.length} countries available!</h1>
								<p>Click on a country to see it's new and expiring Netflix content!</p>
							</Header>
						</div>
					)}
					{loadedCountries ? (
						<div id="country-page-search-section" className="country-page__search-section">
							<Search
								countryList={loadedCountries}
								setUpdatedCountryData={filteredCountriesHandler}
							/>
						</div>
					) : null}
					<div id="country-page-list-countries" className="country-page__list-country">
						{loadedCountries && countryListData && (
							<CountryList onItemClicked={onCountryClickedHandler} items={countryListData} />
						)}
					</div>
				</div>
			)}
		</React.Fragment>
	);
};
