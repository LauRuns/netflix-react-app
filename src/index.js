import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import * as serviceWorker from './serviceWorker';
import { AuthContextProvider } from './shared/context/auth-context';
import { UserContextProvider } from './shared/context/user-context';
import { CookiesProvider } from 'react-cookie';
import SnackbarProvider from 'react-simple-snackbar';

import './index.scss';

const rootElement = document.getElementById('root');

ReactDOM.render(
	<>
		<Router>
			<AuthContextProvider>
				<UserContextProvider>
					<CookiesProvider>
						<SnackbarProvider>
							<App />
						</SnackbarProvider>
					</CookiesProvider>
				</UserContextProvider>
			</AuthContextProvider>
		</Router>
	</>,
	rootElement
);

// ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
