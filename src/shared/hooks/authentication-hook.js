import React, { useState, useContext, createContext, useCallback, useEffect } from 'react';

const AuthContext = createContext();
let logoutTimer;

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);
	const [userCountry, setUserCountry] = useState(null);

	const login = useCallback((uid, token, country, expirationDate) => {
		setToken(token);
		setUserId(uid);
		setUserCountry(country);
		setIsAuthenticated(true);

		const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60);
		setTokenExpirationDate(tokenExpirationDate);

		localStorage.setItem(
			'userData',
			JSON.stringify({
				userId: uid,
				token: token,
				country: country,
				expiration: tokenExpirationDate.toISOString()
			})
		);
	}, []);

	const logout = useCallback(() => {
		setIsAuthenticated(false);
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		setUserCountry(null);
		localStorage.removeItem('userData');
	}, []);

	const updateCountry = useCallback((country) => {
		setUserCountry(country);
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
			login(
				storedData.userId,
				storedData.token,
				storedData.country,
				new Date(storedData.expiration)
			);
		}
	}, [login]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isAuthenticated || localStorage.getItem('userData') ? true : false,
				token: token,
				userId: userId,
				country: userCountry,
				login: login,
				logout: logout,
				updateCountry: updateCountry
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthentication = () => useContext(AuthContext);
