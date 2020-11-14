import React, { useState, useContext, useEffect } from 'react';

import Card from '../../../../shared/components/UIElements/Card/Card';
import Button from '../../../../shared/components/UIElements/Button/Button';
import Modal from '../../../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../../../shared/components/UIElements/Spinner/LoadingSpinner';

import { useHttpClient } from '../../../../shared/hooks/http-hook';
import { AuthContext } from '../../../../shared/context/auth-context';

import './CountryDetailItem.scss';

const CountryDetailItem = ({ netflixid, title, expiredate, image }) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);
	const [showDetails, setShowDetails] = useState(false);
	const [itemDetail, setItemDetail] = useState();

	const openDetailsHandler = () => setShowDetails(true);
	const closeDetailsHandler = () => setShowDetails(false);

	const fetchDetails = async () => {
		try {
			// const responseData = await sendRequest(
			// 	`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search/idinfo`,
			// 	'POST',
			// 	JSON.stringify({ netflixid: netflixid }),
			// 	{
			// 		'Content-Type': 'application/json',
			// 		Authorization: `Bearer ${auth.token}`
			// 	}
			// );
			// console.log(responseData.results);
			// setItemDetail(responseData.results);
			// openDetailsHandler(true);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	useEffect(() => {
		const fetchCountrDetail = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search/idinfo`,
					'POST',
					JSON.stringify({ netflixid: netflixid }),
					{
						'Content-Type': 'application/json',
						Authorization: `Bearer ${auth.token}`
					}
				);

				console.log(responseData.results);
				setItemDetail(responseData.results);
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};
		fetchCountrDetail();
	}, [sendRequest]);

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
					<LoadingSpinner loadingSpinnerMessage={netflixid} />
				</div>
			) : (
				itemDetail &&
				!isLoading && (
					<div className="detail-poster-card">
						<Card expire onClick={openDetailsHandler}>
							<div className="detail-card">
								<div>
									<h3>Title: {itemDetail.title}</h3>
									<p>Netflix id: {itemDetail.netflixid}</p>
									<p>Expiration date: {itemDetail.expiredate}</p>
								</div>
								<div>
									<Button onClick={openDetailsHandler}>SHOW DETAILS</Button>
								</div>
							</div>
							<div>
								<img src={itemDetail.img} alt="" />
							</div>
						</Card>
					</div>
				)
			)}
		</React.Fragment>
	);
};

export default CountryDetailItem;
