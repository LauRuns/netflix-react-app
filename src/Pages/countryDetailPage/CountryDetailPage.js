import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import { IconButton, Modal } from '../../components/uiElements';
import { IconNavItem } from '../../components/navigation';
import { Header } from '../../components/atoms';
import { NetflixItem } from '../../components/molecules';
import { NewContentList, ExpContentList } from '../../components/organisms';
import './CountryDetailPage.scss';

export const CountryDetailPage = () => {
	const [showDetails, setShowDetails] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);

	const { countryId, countryName } = useParams();

	const openModal = () => setShowDetails(true);
	const closeModal = () => setShowDetails(false);

	const detailItemClicked = (data) => {
		setSelectedItem(data);
		openModal();
	};

	return (
		<React.Fragment>
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
			<div className="country-detail-page-container">
				<div id="country-detail-page-header" className="dp__header">
					<Header center lg>
						<h2>Content for {countryName || '...'}</h2>
					</Header>
					<IconNavItem link="/countries" iconName="chevron_left" iconSize={54}>
						Back to countries overview
					</IconNavItem>
				</div>

				<div id="country-detail-page-newcontent" className="dp__newcontent">
					<Header md>
						<h2>New content for {countryName || '...'}</h2>
					</Header>
					<NewContentList countryIdCode={`${countryId}`} itemClick={detailItemClicked} />
				</div>

				<div id="country-detail-page-expiringcontent" className="dp__expcontent">
					<Header md>
						<h2>Expiring content for {countryName || '...'}</h2>
					</Header>
					<ExpContentList countryIdCode={`${countryId}`} itemClick={detailItemClicked} />
				</div>
			</div>
		</React.Fragment>
	);
};
