import React, { useState, useContext, useEffect } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import { Header } from '../../shared/components/UIElements/header/Header';
import { SampleSlider } from '../../components/sample-slider/SampleSLider';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import { IconButton } from '../../shared/components/UIElements/iconButton/IconButton';
import { NetflixItem } from '../netflixItem/NetflixItem';
import { IconNavItem } from '../../shared/components/Navigation/iconNavItem/IconNavItem';
import './CountryDetailPage.scss';

import { testitems } from '../../assets/testitems';

export const CountryDetailPage = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [expCountryData, setExpCountryData] = useState(null);
	const [newCountryData, setNewCountryData] = useState(null);

	const [showDetails, setShowDetails] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const { name, countryId } = props.location.state;
	console.log(props.location.state);

	const fetchCountryNetflixData = async () => {
		try {
			console.time();
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search/countrydata`,
				'POST',
				JSON.stringify({ countryId: countryId, offset: 0, limit: 50 }),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			console.log(responseData);
			const { expResults, newResults } = responseData;
			setNewCountryData(newResults);
			setExpCountryData(expResults);
			console.timeEnd();
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	useEffect(() => {
		// fetchCountryNetflixData();
		setNewCountryData(testitems);
		setExpCountryData(testitems);
		return () => {
			// cleanup
		};
	}, []);

	const openModal = () => setShowDetails(true);
	const closeModal = () => setShowDetails(false);

	const detailItemClicked = (data) => {
		console.log('ITEM DETAILS_____:', data);
		setSelectedItem(data);
		openModal();
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			{selectedItem && (
				<Modal
					show={showDetails}
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
			{isLoading && <LoadingSpinner loadingSpinnerMessage="Bussy fetching data..." asOverlay />}
			<div className="country-detail-page-container">
				<div id="country-detail-page-header" className="dp__header">
					<Header center lg>
						<h2>Content for {name || '...'}</h2>
					</Header>
					<IconNavItem link="/countries" iconName="chevron_left" iconSize={54}>
						Back to countries overview
					</IconNavItem>
				</div>

				<div id="country-detail-page-newcontent" className="dp__newcontent">
					<Header md>
						<h2>New content for {name || '...'}</h2>
					</Header>
					{!isLoading && newCountryData && (
						<SampleSlider slideList={newCountryData} onClick={detailItemClicked} />
					)}
				</div>

				<div id="country-detail-page-expiringcontent" className="dp__expcontent">
					<Header md>
						<h2>Expiring content for {name || '...'}</h2>
					</Header>
					{!isLoading && expCountryData && (
						<SampleSlider slideList={expCountryData} onClick={detailItemClicked} />
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

// export default CountryDetailPage;
