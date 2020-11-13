import React, { useState, useContext, useEffect } from 'react';

import Card from '../../../../shared/components/UIElements/Card/Card';
import Button from '../../../../shared/components/UIElements/Button/Button';
import Modal from '../../../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../../../shared/components/UIElements/Spinner/LoadingSpinner';

import { useHttpClient } from '../../../../shared/hooks/http-hook';
import { AuthContext } from '../../../../shared/context/auth-context';

import './CountryDetailItem.scss';

const CountryDetailItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	const [showDetails, setShowDetails] = useState(false);
	const [itemDetail, setItemDetail] = useState();

	const openDetailsHandler = () => setShowDetails(true);
	const closeDetailsHandler = () => setShowDetails(false);

	const fetchDetails = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search/idinfo`,
				'POST',
				JSON.stringify({ netflixid: props.id }),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);
			console.log(responseData.results);
			setItemDetail(responseData.results);
			openDetailsHandler(true);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			{itemDetail && !isLoading && (
				<Modal
					show={showDetails}
					onCancel={closeDetailsHandler}
					header={itemDetail.title}
					contentClass="place-item__modal-content"
					footerClass="place-item__modal-actions"
					footer={<Button onClick={closeDetailsHandler}>CLOSE</Button>}
				>
					<div className="item-details">
						<div>
							<p>{itemDetail.synopsis}</p>
							<p>Language: {itemDetail.imdblanguage || 'Uknown language'}</p>
							<p>Year: {itemDetail.year || 'No year data'}</p>
						</div>
						<img src={itemDetail.img} alt={itemDetail.title} />
					</div>
				</Modal>
			)}

			{isLoading ? (
				<div className="center">
					<LoadingSpinner loadingSpinnerMessage={`Fetching data for ${props.title}`} />
				</div>
			) : (
				<Card expire>
					<div className="detail-card">
						<div>
							<h3>Title: {props.title}</h3>
							<p>Netflix id: {props.netflixid}</p>
							<p>Expiration date: {props.expiredate}</p>
						</div>
						<div>
							<Button onClick={fetchDetails}>SHOW DETAILS</Button>
						</div>
					</div>
				</Card>
			)}
		</React.Fragment>
	);
};

export default CountryDetailItem;
