import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import Button from '../../shared/components/UIElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import Carousel from '../../components/Carousel/Carousel';
import Card from '../../shared/components/UIElements/Card/Card';
import Chip from '../../shared/components/UIElements/Chip/Chip';

import './LandingPage.scss';

const LandingPage = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [userCountry, setUserCountry] = useState(null);
	const [expiringData, setExpiringData] = useState(null);
	const [nldExpiring, setNldExpiring] = useState(null);
	const [nldNewContent, setNldNewContent] = useState(null);

	useEffect(() => {
		// const getCountryFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
		// const { country } = getCountryFromLocalStorage;
		// console.log('Get userData --> country', country);

		const { country } = auth;
		console.log('Landingpage --> Auth.country____::', country);
		setUserCountry(country);

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
				const { results, resultsNL, newResultsNL } = expResponseData;
				console.log(results);
				setExpiringData(results);
				setNldExpiring(resultsNL);
				setNldNewContent(newResultsNL);
			} catch (error) {
				// Error is handled by useHttpClient
			}
		};
		fetchExpiringData();
	}, [sendRequest]);
	// });

	const onExpiredItemClickedHandler = (e) => {
		console.log('onExpiredItemClickedHandler_____-->__::', e);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<div className="landingpage-container">
				<div id="homepage-header" className="homepage__header">
					<h1>Welcome back!</h1>
					{userCountry && <h3>Here is your data for {userCountry.country}</h3>}
				</div>
				<div id="homepage-expiring" className="homepage__expiring">
					{userCountry && <h2>Expiring content for {userCountry.country}:</h2>}
					{isLoading ? (
						<LoadingSpinner loadingSpinnerMessage={`Loading data for ${userCountry.country}`} />
					) : (
						<div className="carousel-homepage">
							{/* {expiringData && (
							<Carousel list={expiringData} itemClicked={onExpiredItemClickedHandler} />
						)} */}
							{expiringData &&
								expiringData.map((item) => {
									let id = Math.random();
									return (
										<Card homecard key={id} onClick={() => onExpiredItemClickedHandler(item)}>
											<h3>{item.title}</h3>
										</Card>
									);
								})}
						</div>
					)}
				</div>
				<div id="homepage-nld-expiring" className="homepage__nld__expiring">
					<h2>Netherlands expiring content:</h2>
					{isLoading ? (
						<LoadingSpinner loadingSpinnerMessage={`Loading data for Netherlands`} />
					) : (
						nldExpiring && <Carousel list={nldExpiring} itemClicked={onExpiredItemClickedHandler} />
					)}
				</div>
				<div id="homepage-nld-new-content" className="homepage__nld__new_content">
					<h2>Netherlands new content:</h2>
					{nldNewContent && (
						<Carousel list={nldNewContent} itemClicked={onExpiredItemClickedHandler} />
					)}
				</div>
				<div id="homepage-testing-carousel" className="homepage__testing__carousel">
					<h2>Testing new carousel</h2>
					<div className="test-carousel">
						{nldNewContent && (
							<Carousel list={nldNewContent} itemClicked={onExpiredItemClickedHandler} />
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
};

export default LandingPage;
