import React, { useState, useContext, createContext, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
/* Create the AuthContext */
const AuthContext = createContext();
let logoutTimer;
/* Set up AuthContextProvider that wraps its children. It holds the authentication context for the app */
export const AuthContextProvider = ({ children }) => {
	const [authState, setAuthState] = useState({
		isLoggedIn: false,
		userId: null,
		token: null
	});
	const [token, setToken] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState(null);
	const history = useHistory();

	/* Set login and store user ID and token in the local storage */
	const login = useCallback((uid, token, expirationDate) => {
		setAuthState({
			...authState,
			isLoggedIn: true,
			userId: uid,
			token: token
		});
		setToken(token);

		const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);

		localStorage.setItem(
			'tokenData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString()
			})
		);
	}, []);

	/* On logout set all state back to null and remove objects from localstorage */
	const logout = useCallback(() => {
		setAuthState({
			...authState,
			isLoggedIn: false,
			userId: null,
			token: null
		});
		setTokenExpirationDate(null);
		setToken(null);
		localStorage.removeItem('tokenData');
		localStorage.removeItem('countryData');
		history.push('/login');
	}, [history]);

	/* Check if token and token expiration date are available set the current logout timer based on those values */
	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	/* Allows for reload automatic login when the token expiration date has not yet expired */
	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('tokenData'));
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
		}
	}, [login]);

	const authData = {
		...authState,
		isAuthenticated: authState.userId !== null && authState.isLoggedIn,
		login,
		logout
	};

	/* Return all data and methods so they are accessible by the rest of the application  */
	return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export const useAuthState = () => useContext(AuthContext);
