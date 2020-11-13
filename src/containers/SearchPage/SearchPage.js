import React, { useState, useEffect, useContext } from 'react';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/UIElements/Button/Button';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import { VALIDATOR_MAXLENGTH } from '../../shared/util/validators';
import SearchPageList from './SearchPageList/SearchPageList';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';

import Dropdown from '../../shared/components/FormElements/DropDown/Dropdown';
import Backdrop from '../../shared/components/UIElements/Backdrop/Backdrop';

import './SearchPage.scss';

const SearchPage = () => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [countryList, setCountryList] = useState();
	const [searchSelectedCountry, setSearchSelectedCountry] = useState();
	const [searchResults, setSearchResults] = useState();

	const [formState, inputHandler, setFormData] = useForm(
		{
			title: {
				value: '',
				isValid: false
			}
		},
		false
	);

	const countrySearchSelectHandler = (e) => {
		const { countryId } = countryList.find((item) => item.country === e.target.value);
		setSearchSelectedCountry(countryId);
	};

	useEffect(() => {
		const loadCountries = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
				);
				console.log(responseData);
				setCountryList(responseData.results);
				// setCountryList([]); // when not wanting to make database requests
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};
		loadCountries();
	}, [sendRequest]);

	const searchFormSubmitHandler = async (event) => {
		event.preventDefault();
		try {
			const searchResponseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search`,
				'POST',
				JSON.stringify({
					query: formState.inputs.title.value,
					countrylist: searchSelectedCountry
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			console.log(searchResponseData.results);
			setSearchResults(searchResponseData.results);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	const selectedCountryHandler = ({ countryId }) => {
		console.log('selectedCountryHandler', countryId);
		setSearchSelectedCountry(countryId);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="search-page-container">
				<div id="srch-pg-item-1" className="search-page-item">
					<h1>Search the Netflix unogsNG database!</h1>
					<p>Check if content is available on Netflix for a specific country</p>
				</div>
				<div id="srch-pg-item-2" className="search-page-item">
					<form className="srch-form" onSubmit={searchFormSubmitHandler}>
						<div className="search-form-fields">
							<div className="country-select-dropdown">
								<Dropdown
									title="Select country"
									label="Please select a country"
									items={countryList}
									selected={selectedCountryHandler}
								/>
							</div>
							<div className="title-srch-input">
								<Input
									id="title"
									element="input"
									validators={[VALIDATOR_MAXLENGTH(20)]}
									errorText="Please enter a title"
									onInput={inputHandler}
									placeholder="Enter movie or serie title..."
									label="Enter title"
								/>
							</div>
						</div>
						<Button type="submit" disabled={!formState.isValid | !searchSelectedCountry}>
							SEARCH
						</Button>
					</form>
				</div>
				<div id="srch-pg-item-3">
					{isLoading ? (
						<div className="center">
							<LoadingSpinner
								loadingSpinnerMessage={`Fetching data for ${formState.inputs.title.value}`}
							/>
						</div>
					) : (
						<h3>
							{searchResults
								? ` ${searchResults.length} items found`
								: 'You have not entered a search query yet...'}
						</h3>
					)}
					{searchResults && !isLoading && <SearchPageList list={searchResults} />}
				</div>
			</div>
		</React.Fragment>
	);
};

export default SearchPage;
