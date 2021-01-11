import React, { useState, useContext, createContext, useCallback, useEffect } from 'react';
/* Create the AuthContext */
const AuthContext = createContext();
let logoutTimer;
/* Set up AuthProvider that wraps its children. It holds the authentication context for the app */
export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [token, setToken] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(null);

	/* Set login and store user ID and token in the local storage */
	const login = useCallback((uid, token, expirationDate) => {
		setToken(token);
		setUserId(uid);
		setIsAuthenticated(true);

		const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);

		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				expiration: tokenExpirationDate.toISOString()
			})
		);
	}, []);

	/* On logout set all state back to null and remove objects from localstorage */
	const logout = useCallback(() => {
		setIsAuthenticated(false);
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
		localStorage.removeItem('countryData');
	}, []);

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
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
		}
	}, [login]);

	/* Return all data and methods so they are accessible by the rest of the application  */
	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isAuthenticated || localStorage.getItem('userData') ? true : false,
				token,
				userId,
				login,
				logout
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthentication = () => useContext(AuthContext);
