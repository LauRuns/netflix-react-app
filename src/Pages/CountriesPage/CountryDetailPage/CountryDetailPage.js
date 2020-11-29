import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { useHttpClient } from '../../../shared/hooks/http-hook';
import { AuthContext } from '../../../shared/context/auth-context';
import LoadingSpinner from '../../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../../shared/components/UIElements/Modal/ErrorModal';
import Button from '../../../shared/components/UIElements/Button/Button';
import CountryDetailItem from './CountryDetailItem/CountryDetailItem';
import './CountryDetailPage.scss';

const CountryDetailPage = (props) => {
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const auth = useContext(AuthContext);

	const [expiringData, setExpiringData] = useState(null);
	const [detailIDs, setDetailIDs] = useState(null);

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

			const { results } = responseData;

			const ids = results.map(({ netflixid }) => netflixid);
			console.log(ids);
			setDetailIDs(ids);

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
			<div className="country-detail-page-container">
				<div id="detail-1" className="detail-nav-section">
					<h2>Netflix details for {name}</h2>
					<NavLink to="/countries">
						<Button inverse>Back to Country overview</Button>
					</NavLink>
				</div>

				<div id="detail-2">
					<div className="detail-actions">
						<Button onClick={() => fetchExpiringData()}>Expiring content</Button>
						<Button>New content</Button>
						<Button>Current content</Button>
					</div>
				</div>
				<div id="detail-3">
					{isLoading ? (
						<div className="center">
							<LoadingSpinner loadingSpinnerMessage={`Fetching data for ${name}`} />
						</div>
					) : (
						expiringData && (
							<div className="detail-item">
								{detailIDs.map((id) => {
									return (
										<CountryDetailItem
											key={id}
											netflixid={id}
											// title={item.title}
											// expiredate={item.expiredate}
											// image={item.img}
											onClick={() => cardDetailHandler(id)}
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
