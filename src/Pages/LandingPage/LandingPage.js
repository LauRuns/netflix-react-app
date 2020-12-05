import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { IconButton, Modal, ErrorModal, LoadingSpinner } from '../../components/uiElements';
import { Header } from '../../components/atoms';
import { NetflixItem } from '../../components/molecules';
import { Carousel, Slider } from '../../components/organisms';

import './LandingPage.scss';

import { testitems } from '../../assets/testitems';

export const LandingPage = React.memo(() => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const [userCountry, setUserCountry] = useState(null);
	const [nldNewContent, setNldNewContent] = useState(null);
	const [otherNewContent, setOtherNewContent] = useState(null);
	const [expNLD, setExpNLD] = useState(null);
	const [expOther, setExpOther] = useState(null);

	const [selectedItem, setSelectedItem] = useState(null);
	const [showSelected, setShowSelected] = useState(false);

	const fetchLandingPageData = async () => {
		try {
			console.time();
			const responseData = await sendRequest(
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

			const { newResultsNL, newResultsOther, resultsNLD, resultsOTHER } = responseData;
			console.log(responseData);
			setNldNewContent(newResultsNL);
			setExpNLD(resultsNLD);
			setExpOther(resultsOTHER);
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

			setNldNewContent(testitems);
			setExpNLD(testitems);
			setExpOther(testitems);
			setOtherNewContent(testitems);
		}
		return () => {
			cancelRequest = true;
		};
	}, [auth]);
	// });

	const onItemClickedHandler = (data) => {
		console.log('onExpiredItemClickedHandler_____-->__::', data);
		setSelectedItem(data);
		openModal();
	};

	const openModal = () => setShowSelected(true);
	const closeModal = () => setShowSelected(false);

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{selectedItem && (
				<Modal
					show={showSelected}
					header={selectedItem.title}
					onCancel={closeModal}
					footer={
						<IconButton
							icon="cancel"
							buttonType="button"
							before
							inverse
							iconStyle={{ marginRight: '0.5rem' }}
							onClick={closeModal}
						>
							CLOSE
						</IconButton>
					}
				>
					<NetflixItem item={selectedItem} />
				</Modal>
			)}

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
						expOther && <Slider slideList={expOther} onClick={onItemClickedHandler} />
					)}
				</div>
				<div id="homepage-nld-expiring" className="homepage__nld__expiring">
					<Header md>
						<h2>Netherlands expiring content:</h2>
					</Header>
					{isLoading ? (
						<LoadingSpinner center loadingSpinnerMessage={`Loading expiring content...`} />
					) : (
						expNLD && <Slider slideList={expNLD} onClick={onItemClickedHandler} />
					)}
				</div>
				<div id="homepage-nld-new-content" className="homepage__nld__new_content">
					<Header md>
						<h2>New content for the Netherlands:</h2>
					</Header>
					{isLoading ? (
						<LoadingSpinner center loadingSpinnerMessage={`Loading new content...`} />
					) : (
						nldNewContent && <Slider slideList={nldNewContent} onClick={onItemClickedHandler} />
					)}
				</div>
				<div id="homepage-testing-carousel" className="homepage__testing__carousel">
					<Header md>
						<h2>New content for {auth.country.country}:</h2>
					</Header>
					{/* {isLoading ? (
						<LoadingSpinner
							center
							loadingSpinnerMessage={`Loading new content for ${userCountry.country}`}
						/>
					) : (
						otherNewContent && (
							<SampleSlider slideList={otherNewContent} onClick={onItemClickedHandler} />
						)
					)} */}
					{isLoading ? (
						<LoadingSpinner
							center
							loadingSpinnerMessage={`Loading new content for ${userCountry.country}`}
						/>
					) : (
						otherNewContent && (
							<Carousel list={otherNewContent} itemClicked={onItemClickedHandler} />
						)
					)}
				</div>
			</div>
		</React.Fragment>
	);
});
