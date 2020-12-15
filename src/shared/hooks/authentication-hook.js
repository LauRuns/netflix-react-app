import React, { useState, useContext, createContext, useCallback, useEffect, useRef } from 'react';

const AuthContext = createContext();
let logoutTimer;

const defaultCountry = {
	country: 'Netherlands',
	countryId: 67
};

export const AuthProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	const [token, setToken] = useState(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(null);
	const [userCountry, setUserCountry] = useState(null);

	const isMounted = useRef(null);

	useEffect(() => {
		// executed when component mounted
		isMounted.current = true;
		return () => {
			// executed when unmount
			isMounted.current = false;
		};
	}, []);

	const login = useCallback((uid, token, country = defaultCountry, expirationDate) => {
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
		return () => {
			isMounted.current = false;
		};
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
		return () => {
			isMounted.current = false;
		};
	}, [login]);

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated: isAuthenticated || localStorage.getItem('userData') ? true : false,
				token,
				userId,
				country: userCountry,
				login,
				logout,
				updateCountry
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthentication = () => useContext(AuthContext);
