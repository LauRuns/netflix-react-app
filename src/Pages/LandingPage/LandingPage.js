import React, { useState, useEffect } from 'react';

import { IconButton, Modal } from '../../components/uiElements';
import { Header } from '../../components/atoms';
import { NetflixItem } from '../../components/molecules';
import { ExpContentList, NewContentList } from '../../components/organisms';

import './LandingPage.scss';

export const LandingPage = () => {
	const [currentUserCountry, setCurrentUserCountry] = useState(null);
	const [selectedItem, setSelectedItem] = useState(null);
	const [showSelected, setShowSelected] = useState(false);

	useEffect(() => {
		const { country } = JSON.parse(localStorage.getItem('userData'));
		setCurrentUserCountry(country);
	}, []);

	const onItemClickedHandler = (data) => {
		setSelectedItem(data);
		openModal();
	};

	const openModal = () => setShowSelected(true);
	const closeModal = () => setShowSelected(false);

	return (
		<React.Fragment>
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
					{currentUserCountry && (
						<h3>Here is your new &amp; expiring data for {currentUserCountry.country}</h3>
					)}
				</div>
				<div id="homepage-new-current" className="homepage__new__current">
					<Header md>
						{currentUserCountry && <h2>New content for {currentUserCountry.country}:</h2>}
					</Header>
					{currentUserCountry && (
						<NewContentList
							countryIdCode={`${currentUserCountry.countryId}`}
							itemClick={onItemClickedHandler}
						/>
					)}
				</div>
				<div id="homepage-nld-new" className="homepage__nld__new_content">
					<Header md>
						<h2>New content for the Netherlands:</h2>
					</Header>
					<NewContentList countryIdCode="67" itemClick={onItemClickedHandler} />
				</div>
				<div id="homepage-current-expiring" className="homepage__current__expiring">
					<Header md>
						{currentUserCountry && <h2>Expiring content for {currentUserCountry.country}:</h2>}
					</Header>
					{currentUserCountry && (
						<ExpContentList
							countryIdCode={`${currentUserCountry.countryId}`}
							itemClick={onItemClickedHandler}
						/>
					)}
				</div>
				<div id="homepage-nld-expiring" className="homepage__nld__expiring">
					<Header md>
						<h2>Netherlands expiring content:</h2>
					</Header>
					<ExpContentList countryIdCode="67" itemClick={onItemClickedHandler} />
				</div>
			</div>
		</React.Fragment>
	);
};
