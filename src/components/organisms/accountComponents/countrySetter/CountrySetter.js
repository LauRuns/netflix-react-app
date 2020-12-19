import React, { useState, useEffect, useRef } from 'react';

import { IconButton, ErrorModal, LoadingSpinner } from '../../../uiElements';
import { CountryDropdown } from '../../../formElements/countryDropdown/CountryDropdown';
import { useContextUser } from '../../../../shared/context/user-context';
import { useNetflixClient } from '../../../../shared/hooks/netflix-hook';
import { useForm } from '../../../../shared/hooks/form-hook';
import { VALIDATOR_OBJECT } from '../../../../shared/util/validators';

import './CountrySetter.scss';

export const CountrySetter = () => {
	const { isLoading, error, fetchNetflixData, clearError } = useNetflixClient();
	const { currentUser, updateUser } = useContextUser();

	const [countryList, setCountryList] = useState(null);

	const isMounted = useRef(null);

	const [formState, inputHandler, setFormData] = useForm(
		{
			country: {
				value: {},
				isValid: false
			}
		},
		false
	);

	useEffect(() => {
		isMounted.current = true;
		const fetchCountries = async () => {
			try {
				let countryData = [];
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
						countryData.push(newEl);
					});
					if (isMounted.current) {
						setCountryList(countryData);
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

	const updateUserCountryHandler = async (event) => {
		event.preventDefault();
		updateUser({ country: formState.inputs.country.value });
	};

	if (isLoading) {
		return <LoadingSpinner asOverlay loadingSpinnerMessage="Loading..." />;
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<div className="country-set-container">
				<form className="set-country-form" onSubmit={updateUserCountryHandler}>
					<div className="country-dsply-info">
						<p>
							Set your country. The next time you log in it will load Netflix data based on your
							selected country.
						</p>
					</div>
					<div className="country-dd-selector">
						<CountryDropdown
							id="country"
							title="Select country"
							label="Select your country of interest"
							items={countryList}
							onInput={inputHandler}
							validators={[VALIDATOR_OBJECT()]}
							errorText="Please select a country"
						/>
					</div>
					<div className="check-save">
						<p>
							{formState.inputs.country.value
								? `Save ${formState.inputs.country.value.country} as your new default country?`
								: 'No country selected'}
						</p>
						<IconButton
							icon="save"
							iconSize={24}
							iconColor="#fff"
							disabled={!formState.isValid}
							buttonType="submit"
							before
							iconStyle={{ marginRight: '.5rem' }}
						>
							SAVE
						</IconButton>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
};
