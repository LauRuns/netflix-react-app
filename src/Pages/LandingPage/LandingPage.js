import React, { useState } from 'react';

import { IconButton, Modal } from '../../components/uiElements';
import { Header } from '../../components/atoms';
import { NetflixItem } from '../../components/molecules';
import { ExpContentList, NewContentList } from '../../components/organisms';
import { useContextUser } from '../../shared/context/user-context';

import './LandingPage.scss';

export const LandingPage = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const [showSelected, setShowSelected] = useState(false);
	const { currentUser } = useContextUser();

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
					{currentUser && (
						<h3>Here is your new &amp; expiring data for {currentUser.country.country}</h3>
					)}
				</div>
				<div id="homepage-new-current" className="homepage__new__current">
					<Header md>
						{currentUser && <h2>New content for {currentUser.country.country}:</h2>}
					</Header>
					{currentUser && (
						<NewContentList
							countryIdCode={`${currentUser.country.countryId}`}
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
						{currentUser && <h2>Expiring content for {currentUser.country.country}:</h2>}
					</Header>
					{currentUser && (
						<ExpContentList
							countryIdCode={`${currentUser.country.countryId}`}
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
