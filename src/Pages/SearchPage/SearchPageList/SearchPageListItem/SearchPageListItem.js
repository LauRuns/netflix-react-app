import React, { useState, useContext } from 'react';

import Card from '../../../../shared/components/UIElements/Card/Card';
import Button from '../../../../shared/components/UIElements/Button/Button';
import Modal from '../../../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../../../shared/components/UIElements/Modal/ErrorModal';
import { AuthContext } from '../../../../shared/context/auth-context';
import { useHttpClient } from '../../../../shared/hooks/http-hook';
import LoadingSpinner from '../../../../shared/components/UIElements/Spinner/LoadingSpinner';
import './SearchPageListItem.scss';

const SearchPageListItem = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [detailInfo, setDetailInfo] = useState(null);
	const [cList, setCList] = useState(null);
	const [showSPItemDetail, setSPItemDetail] = useState(false);

	const openDetailInfo = () => setSPItemDetail(true);
	const closeDetailInfo = () => setSPItemDetail(false);

	const onOpenSearchDetailHandler = async (e) => {
		console.log('__Open detail info____::', e);
		try {
			// fetch details for specific Netflix item
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search/idinfo`,
				'POST',
				JSON.stringify({
					netflixid: e
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			// fetch countries in which the item is available
			const responseDataCountryOnID = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search/netflixid`,
				'POST',
				JSON.stringify({
					netflixid: e
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			setDetailInfo(responseData.results);
			const { results } = responseDataCountryOnID;
			setCList(results);
			openDetailInfo();
		} catch (error) {
			// Error handled by useHttpClient
		}
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />

			{detailInfo && !isLoading && (
				<Modal
					show={showSPItemDetail}
					onCancel={closeDetailInfo}
					header={detailInfo.title}
					contentClass="place-item__modal-content"
					footerClass="place-item__modal-actions"
					footer={<Button onClick={closeDetailInfo}>CLOSE</Button>}
				>
					<div className="sr-res-countrylist">
						<h3>Available in countries:</h3>
						<br />
						<div>
							{cList &&
								cList.map((element) => {
									return <p key={element}>{element}</p>;
								})}
						</div>
					</div>
				</Modal>
			)}

			{isLoading ? (
				<div className="center">
					<LoadingSpinner loadingSpinnerMessage={`Fetching data for ${props.title}`} />
				</div>
			) : (
				<div className="search-result">
					<Card searchresult onClick={() => onOpenSearchDetailHandler(props.netflixId)}>
						<div className="sr-res-card-header">
							<h3>{props.title}</h3>
							<p>This is a Netflix {props.contentType}.</p>
						</div>
						<div className="sr-res-content-container">
							<div className="sr-res-synopsis">
								<div>
									<p>{props.synopsis}</p>
									<br />
									<hr />
									<br />
									<p>
										<b>Production year: </b>
										{props.year}
									</p>
									<p>
										<b>Netflix rating: </b>
										{props.avgrating}
									</p>
								</div>
							</div>
							<div className="sr-res-img-container">
								<img src={props.img} alt={props.netflixId} />
							</div>
						</div>
						<div className="sr-res-mobile-only">
							<img src={props.img} alt={props.netflixId} />
						</div>
					</Card>
				</div>
			)}
		</React.Fragment>
	);
};

export default SearchPageListItem;
