import React, { useState, useContext } from 'react';

import Button from '../../../shared/components/UIElements/Button/Button';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHttpClient } from '../../../shared/hooks/http-hook';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import Dropdown from '../../../shared/components/FormElements/DropDown/Dropdown';
import './CountrySetter.scss';

const CountrySetter = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [selectedCountry, setSelectedCountry] = useState(props.userCountry.country || undefined);

	if (!props.countryData) {
		return (
			<div className="loading-countries">
				<LoadingSpinner loadingSpinnerMessage="Loading country data..." />
			</div>
		);
	}

	const countryList = props.countryData;

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
					username: props.username,
					email: props.email,
					country: selectedCountry
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);
			onUpdate(responseData.updatedUser);
		} catch (err) {
			// Error is handled by the useHttpClient
		}
	};

	const onUpdate = (event) => {
		props.setNewSelectedCountry(event);
	};

	if (isLoading) {
		return (
			<div className="center">
				<LoadingSpinner loadingSpinnerMessage="Updating..." />
			</div>
		);
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
						<Dropdown
							items={countryList}
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
						<Button disabled={!selectedCountry} type="submit">
							SAVE COUNTRY
						</Button>
					</div>
				</form>
			</div>
		</React.Fragment>
	);
};

export default CountrySetter;
