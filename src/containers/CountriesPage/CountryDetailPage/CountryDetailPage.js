import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import Button from '../../../shared/components/UIElements/Button/Button';
import CountryDetailItem from './CountryDetailItem/CountryDetailItem';
import './CountryDetailPage.css';

const CountryDetailPage = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [expiringData, setExpiringData] = useState(null);

	const { name, countryId } = props.location.state;

	const fetchExpiringData = async () => {
		console.log('countryId', countryId);
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/search/expiring`,
				'POST',
				JSON.stringify({ countryId: countryId, offset: 0, limit: 50 }),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${auth.token}`
				}
			);

			const { count, results } = responseData;

			console.log('EXPIRING DATA_____::', responseData);
			setExpiringData(results);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	const cardDetailHandler = (e) => {
		console.log('CARD__DETAILS____::', e);
	};

	return (
		<React.Fragment>
			<ErrorModal error={error} onClear={clearError} />
			<div className="country-detail-page">
				<div id="detail-nav-1" className="detail-nav-section">
					<NavLink to="/">
						<Button inverse>Back to Country overview</Button>
					</NavLink>
				</div>

				<div id="detail-container-2" className="cntry-detail-page-container">
					<h1>Netflix details for {name}</h1>
				</div>
				<div id="detail-expiring-3">
					<div className="detail-actions">
						<Button onClick={() => fetchExpiringData()}>Expiring content</Button>
					</div>
					{isLoading ? (
						<div className="center">
							<LoadingSpinner loadingSpinnerMessage={`Fetching data for ${name}`} />
						</div>
					) : (
						expiringData && (
							<div className="detail-item">
								{expiringData.map((item) => {
									return (
										<CountryDetailItem
											key={item.netflixid}
											id={item.netflixid}
											title={item.title}
											expiredate={item.expiredate}
											onClick={() => cardDetailHandler(item)}
										/>
									);
								})}
							</div>
						)
					)}
				</div>
			</div>
		</React.Fragment>
	);
};

export default CountryDetailPage;
