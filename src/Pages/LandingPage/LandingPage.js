import React, { useState, useEffect, useContext, useCallback } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import Button from '../../shared/components/UIElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import { Tooltip } from '../../shared/components/UIElements/Tooltip/Tooltip';
import { Header } from '../../shared/components/UIElements/header/Header';

import { SampleSlider } from '../../components/sample-slider/SampleSLider';

import './LandingPage.scss';

const LandingPage = React.memo(() => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [userCountry, setUserCountry] = useState(null);
	const [nldNewContent, setNldNewContent] = useState(null);
	const [otherNewContent, setOtherNewContent] = useState(null);
	const [expNLD, setExpNLD] = useState(null);
	const [expOther, setExpOther] = useState(null);

	const renders = React.useRef(0);

	const fetchLandingPageData = useCallback(async () => {
		try {
			console.time();
			const expResponseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/home`,
				'POST',
				JSON.stringify({
					countryId: auth.country.countryId
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			const { newResultsNL, newResultsOther, resultsNLD, resultsOTHER } = expResponseData;
			setNldNewContent(newResultsNL);
			setExpNLD(resultsNLD);
			setExpOther(resultsOTHER);
			setOtherNewContent(newResultsOther);
			console.timeEnd();
		} catch (error) {
			// Error is handled by useHttpClient
		}
	});

	const fetchNldData = async () => {
		try {
			console.time();
			const nldResponseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/home/nld`,
				'POST',
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);
			console.log('nldResponseData______:', nldResponseData);
			const { expResults, newResults } = nldResponseData;
			setExpNLD(expResults);
			setNldNewContent(newResults);
			console.timeEnd();
		} catch (error) {
			// Error is handled by useHttpClient
		}
	};

	const fetchOtherData = async () => {
		try {
			console.time();
			const otherResponseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/home/other`,
				'POST',
				JSON.stringify({
					countryId: auth.country.countryId
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			console.log('Other - ResponseData______:', otherResponseData);
			const { expResultsOther, newResultsOther } = otherResponseData;
			setExpOther(expResultsOther);
			setOtherNewContent(newResultsOther);
			console.timeEnd();
		} catch (error) {
			// Error is handled by useHttpClient
		}
	};

	useEffect(() => {
		let cancelRequest = false;
		// const getCountryFromLocalStorage = JSON.parse(localStorage.getItem('userData'));
		// const { country } = getCountryFromLocalStorage;
		// console.log('Get userData --> country', country);

		const { country } = auth;
		console.log('Landingpage --> Auth.country____::', country);
		setUserCountry(country);

		if (cancelRequest) {
			return;
		} else {
			// fetchLandingPageData();
			// fetchNldData();
			// fetchOtherData();
		}
		return () => {
			cancelRequest = true;
		};
	}, []);
	// });

	const onExpiredItemClickedHandler = (e) => {
		console.log('onExpiredItemClickedHandler_____-->__::', e);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			<div className="landingpage-container">
				<div id="homepage-header" className="homepage__header">
					<Header lg>
						<h1>Welcome back!</h1>
					</Header>
					{userCountry && <h3>Here is your new &amp; expiring data for {userCountry.country}</h3>}
				</div>
				<div id="homepage-expiring" className="homepage__expiring">
					<Header md>{userCountry && <h2>Expiring content for {userCountry.country}:</h2>}</Header>
					{isLoading ? (
						<LoadingSpinner
							center
							loadingSpinnerMessage={`Loading data for ${userCountry.country}`}
						/>
					) : (
						expOther && <SampleSlider slideList={expOther} />
					)}
				</div>
				<div id="homepage-nld-expiring" className="homepage__nld__expiring">
					<Header md>
						<h2>Netherlands expiring content</h2>
					</Header>
					<div className="exp-chip-container">
						{isLoading ? (
							<LoadingSpinner center loadingSpinnerMessage={`Loading expiring content...`} />
						) : (
							expNLD && <SampleSlider slideList={expNLD} />
						)}
					</div>
				</div>
				<div id="homepage-nld-new-content" className="homepage__nld__new_content">
					<Header md>
						<h2>New content for the Netherlands:</h2>
					</Header>
					{isLoading ? (
						<LoadingSpinner center loadingSpinnerMessage={`Loading new content...`} />
					) : (
						nldNewContent && <SampleSlider slideList={nldNewContent} />
					)}
				</div>
				<div id="homepage-testing-carousel" className="homepage__testing__carousel">
					<Header md>
						<h2>New content for {auth.country.country}:</h2>
					</Header>
					<div className="test-carousel">
						{isLoading ? (
							<LoadingSpinner
								center
								loadingSpinnerMessage={`Loading new content for ${userCountry.country}`}
							/>
						) : (
							otherNewContent && <SampleSlider slideList={otherNewContent} />
						)}
					</div>
				</div>
			</div>
		</React.Fragment>
	);
});

export default LandingPage;
