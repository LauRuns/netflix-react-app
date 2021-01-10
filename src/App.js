import React from 'react';
/* Pages */
import { MainNavigation } from './pages';
import { Routes } from './routes/Routes';
/* Styling */
import './App.scss';

export const App = () => {
	return (
		<>
			<MainNavigation />
			<div className="main-content">
				<Routes />
			</div>
		</>
	);
};
