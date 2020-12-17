import React, { useState, useContext, createContext, useCallback, useEffect } from 'react';

const AuthContext = createContext();
let logoutTimer;

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [token, setToken] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(null);

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

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		localStorage.removeItem('userData');
		localStorage.removeItem('countryData');
	}, []);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}
	}, [token, logout, tokenExpirationDate]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData'));
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.userId, storedData.token, new Date(storedData.expiration));
		}
	}, [login]);

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
