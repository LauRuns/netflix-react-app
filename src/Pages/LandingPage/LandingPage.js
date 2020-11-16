import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import Button from '../../shared/components/UIElements/Button/Button';

import Modal from '../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';

import './LandingPage.scss';

const LandingPage = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [userCountry, setUserCountry] = useState(null);
	const [expiringData, setExpiringData] = useState(null);

	useEffect(() => {
		console.log('Landingpage --> Auth.country____::', auth.country);
		// const getCountryFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
		// const { country } = getCountryFromLocalStorage;
		// console.log('Get userData --> country', country);
		// setUserCountry(country);

		const fetchExpiringData = async () => {
			try {
				const expResponseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/netflix/home`,
					'POST',
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.token}`
					}
				);
				console.log(expResponseData);
				const { results } = expResponseData;
				console.log(results);
			} catch (error) {
				// Error is handled by useHttpClient
			}
		};
		fetchExpiringData();
	}, [sendRequest]);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<div className="landingpage-container">
				<div id="home-1">
					<h1>Welcome back!</h1>
					{userCountry && <h3>Here is your data for {userCountry.country}</h3>}
				</div>
				<div id="home-2">
					<h2>New releases</h2>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, deserunt!</p>
				</div>
				<div id="home-3">
					<h2>Expiring content</h2>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, deserunt!</p>
				</div>
				<div id="home-4">
					<h2>Deleted content</h2>
					<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt, deserunt!</p>
				</div>
			</div>
		</React.Fragment>
	);
};

export default LandingPage;
