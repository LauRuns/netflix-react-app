import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { CountryList } from '../../components/countryList/CountryList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import { Search } from '../../components/Search/Search';
import { Header } from '../../shared/components/UIElements/header/Header';

import { testCountryList } from '../../assets/testitems';
import './CountriesPage.scss';

export const CountriesPage = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedCountries, setLoadedCountries] = useState();
	const [countryListData, setCountryListData] = useState();

	const history = useHistory();

	const fetchCountries = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
			);
			setLoadedCountries(responseData.results);
			setCountryListData(responseData.results);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	useEffect(() => {
		// fetchCountries();
		setLoadedCountries(testCountryList);
	}, [sendRequest]);

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
