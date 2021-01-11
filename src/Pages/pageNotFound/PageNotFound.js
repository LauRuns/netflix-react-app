import React from 'react';
import { useLocation } from 'react-router-dom';
/* UI element */
import { Button } from '../../components/uiElements';
/* Styling */
import './PageNotFound.scss';

/*
When the user manipulates the url directly and there is no route match, this 404 page not found is presented.
It has a button that on click allow the user to navigate back to the /home screen.
*/
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
