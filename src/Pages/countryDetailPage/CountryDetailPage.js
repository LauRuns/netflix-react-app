import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
/* UI elements and components */
import { IconButton, Modal } from '../../components/uiElements';
import { IconNavItem } from '../../components/navigation';
import { Header } from '../../components/atoms';
import { NetflixItem } from '../../components/molecules';
import { NewContentList, ExpContentList } from '../../components/organisms';
/* Styling */
import './CountryDetailPage.scss';

/*
Presents a list of new and expiring items for the selected country.
The list can be navigated [see components > oragnisms > new & expContentList]
*/
export const CountryDetailPage = () => {
	const [showDetails, setShowDetails] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const { countryId, countryName } = useParams();

	/* Opens modal and present the selected item details */
	const openModal = () => setShowDetails(true);
	const closeModal = () => setShowDetails(false);

	/* Sets the currents selected item and opens the modal */
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
