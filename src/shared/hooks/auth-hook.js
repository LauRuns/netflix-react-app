import { useState, useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

let logoutTimer;

const useAuth = () => {
	const [token, setToken] = useState(false);
	const [tokenExpirationDate, setTokenExpirationDate] = useState();
	const [userId, setUserId] = useState(false);
	const [userCountry, setUserCountry] = useState(null);

	const history = useHistory();

	const login = useCallback((uid, token, country, expirationDate) => {
		setToken(token);
		setUserId(uid);
		setUserCountry(country);

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
		setToken(null);
		setTokenExpirationDate(null);
		setUserId(null);
		setUserCountry(null);
		localStorage.removeItem('userData');
		history.push('/auth');
	}, [history]);

	const updateCountry = useCallback((country) => {
		console.log('Update country called_____:', country);
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

	return { token, login, logout, updateCountry, userId, userCountry };
};

export default useAuth;
