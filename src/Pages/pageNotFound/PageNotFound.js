import React from 'react';
import { useLocation } from 'react-router-dom';

import { Button } from '../../components/uiElements';

import './PageNotFound.scss';

export const PageNotFound = () => {
	let location = useLocation();
	return (
		<>
			<div className="page-not-found-container">
				<h1>
					4<span className="page-not-found-zero"></span>4
				</h1>
				<div className="page-not-found-actions">
					<h3>
						No match for <code>{location.pathname}</code>
					</h3>
					<Button to="/home" inverse exact="true">
						HOME
					</Button>
				</div>
			</div>
		</>
	);
};
