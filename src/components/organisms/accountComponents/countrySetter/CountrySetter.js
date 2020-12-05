import React, { useState, useContext } from 'react';

import { AuthContext } from '../../../../shared/context/auth-context';
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import { IconButton, ErrorModal, LoadingSpinner } from '../../../uiElements';
import { CountryDropdown } from '../../../formElements/countryDropdown/CountryDropdown';

import './CountrySetter.scss';

export const CountrySetter = ({ userData, setNewSelectedCountry, countryData }) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [selectedCountry, setSelectedCountry] = useState(userData.country || null);

	if (!countryData) {
		return (
			<div className="loading-countries">
				<LoadingSpinner loadingSpinnerMessage="Loading country data..." />
			</div>
		);
	}

	const countrySelectHandler = (e) => {
		setSelectedCountry(e);
	};

	const userUpdateCountryHandler = async (event) => {
		event.preventDefault();
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${auth.userId}`,
				'PATCH',
				JSON.stringify({
					username: userData.name,
					email: userData.email,
					country: selectedCountry
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);
			console.log(responseData.updatedUser);
			onUpdate(responseData.updatedUser);
		} catch (err) {
			// Error is handled by the useHttpClient
		}
	};

	const onUpdate = (event) => {
		setNewSelectedCountry(event);
	};

	if (isLoading) {
		return <LoadingSpinner asOverlay loadingSpinnerMessage="Updating..." />;
	}

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<div className="country-set-container">
				<form className="set-country-form" onSubmit={userUpdateCountryHandler}>
					<div className="country-dsply-info">
						<p>
							Set your country. The next time you log in it will load Netflix data based on your
							selected country.
						</p>
					</div>
					<div className="country-dd-selector">
						<CountryDropdown
							items={countryData}
							label="Select country"
							title="Select one..."
							selected={countrySelectHandler}
						/>
					</div>
					<div className="check-save">
						<p>
							{selectedCountry.country
								? `Save ${selectedCountry.country} as your new default country?`
								: 'No country selected'}
						</p>
						<IconButton
							icon="save"
							iconSize={24}
							iconColor="#fff"
							disabled={!selectedCountry}
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
