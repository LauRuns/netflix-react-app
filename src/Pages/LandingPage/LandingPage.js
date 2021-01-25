import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
/* UI elements and components */
import { IconButton, Modal } from '../../components/uiElements';
import { Header } from '../../components/atoms';
import { NetflixItem } from '../../components/molecules';
import { ExpContentList, NewContentList } from '../../components/organisms';
import { useSnackbar } from 'react-simple-snackbar';
/* Styling */
import './LandingPage.scss';

/*
Presents the user with data after login / sign up.
Based on the set country, data for that country will be loaded.
Default data for the Netherlands will always be loaded.
*/
export const LandingPage = () => {
	const [selectedItem, setSelectedItem] = useState(null);
	const { country, countryId } = useParams();

	const options = {
		position: 'bottom-right',
		style: {
			backgroundColor: '#132743',
			border: '1px solid #DB1D4B',
			color: '#DB1D4B',
			fontFamily: 'Menlo, monospace',
			fontSize: '14px',
			textAlign: 'center'
		},
		closeStyle: {
			color: 'lightcoral',
			fontSize: '16px'
		}
	};
	const [openSnackbar, closeSnackbar] = useSnackbar(options);

	useEffect(() => {
		openSnackbar(
			<p>
				This webpage uses cookies. By using this webpage you <strong>consent</strong> to the use of
				cookies.
			</p>
		);
	}, []);

	/* Open the modal presenting the selected item data */
	const onItemClickedHandler = (data) => {
		setSelectedItem(data);
	};

	/* Closing the modal */
	const closeModal = () => setSelectedItem(null);

	return (
		<React.Fragment>
			{selectedItem && (
				<Modal
					show={selectedItem ? true : false} // needs a boolean value and not a Object
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

			{country && countryId ? (
				<div className="landingpage-container">
					<div id="homepage-header" className="homepage__header">
						<Header lg>
							<h1>Welcome back!</h1>
						</Header>
						{country && <h3>Here is your new &amp; expiring data for {country}</h3>}
					</div>
					<div id="homepage-new-current" className="homepage__new__current">
						<Header md>{country && <h2>New content for {country}:</h2>}</Header>
						<NewContentList countryIdCode={countryId} itemClick={onItemClickedHandler} />
					</div>
					<div id="homepage-nld-new" className="homepage__nld__new_content">
						<Header md>
							<h2>New content for the Netherlands:</h2>
						</Header>
						<NewContentList countryIdCode="67" itemClick={onItemClickedHandler} />
					</div>
					<div id="homepage-current-expiring" className="homepage__current__expiring">
						<Header md>{country && <h2>Expiring content for {country}:</h2>}</Header>
						<ExpContentList countryIdCode={countryId} itemClick={onItemClickedHandler} />
					</div>
					<div id="homepage-nld-expiring" className="homepage__nld__expiring">
						<Header md>
							<h2>Netherlands expiring content:</h2>
						</Header>
						<ExpContentList countryIdCode="67" itemClick={onItemClickedHandler} />
					</div>
				</div>
			) : (
				<div>
					<h3>
						Looks like an incorrect country ID was provided for which we have no data available!
					</h3>
				</div>
			)}
		</React.Fragment>
	);
};
