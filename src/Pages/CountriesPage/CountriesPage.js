import React, { useEffect, useState, useRef } from 'react';

import { useNetflixClient } from '../../shared/hooks/netflix-hook';
import { ErrorModal, LoadingSpinner } from '../../components/uiElements';
import { Header } from '../../components/atoms';
import { Search, CountryList } from '../../components/organisms';

import './CountriesPage.scss';

export const CountriesPage = () => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const isMounted = useRef(null);

	const [loadedCountries, setLoadedCountries] = useState();
	const [countryListData, setCountryListData] = useState();

	useEffect(() => {
		isMounted.current = true;
		const fetchCountries = async () => {
			try {
				let countryList = [];
				const response = await fetchNetflixData({
					urlEndpoint: 'countries'
				});
				if (isMounted.current) {
					response.forEach((element) => {
						const newEl = {
							country: element.country.trim(),
							countryId: element.id,
							countrycode: element.countrycode
						};
						countryList.push(newEl);
					});
					if (isMounted.current) {
						setLoadedCountries(countryList);
						setCountryListData(countryList);
					}
				}
			} catch (err) {
				// Error is handled by useNetflixClient
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
						{loadedCountries && countryListData && <CountryList items={countryListData} />}
					</div>
				</div>
			)}
		</React.Fragment>
	);
};
