import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';

export const UserContext = createContext();

export const useContextUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [countryData, setCountryData] = useState(null);
	const { token, userId } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const setNewCurrentUser = useCallback((user) => {
		setCurrentUser(user);

		if (user.country) {
			setCountryData(user.country);
			localStorage.setItem(
				'countryData',
				JSON.stringify({
					countryData: user.country
				})
			);
			sessionStorage.setItem(
				'countryData',
				JSON.stringify({
					countryData: user.country
				})
			);
		}
	}, []);

	const updateUser = async (data) => {
		const { country, username, email } = data;
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${userId}`,
				'PATCH',
				JSON.stringify({
					username: username || currentUser.name,
					email: email || currentUser.email,
					country: country ? { ...country } : currentUser.country
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			setNewCurrentUser(responseData.updatedUser);
		} catch (err) {
			// Error is handled by the useHttpClient
		}
	};

	const updateUserImg = async (data) => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${userId}`,
				'PATCH',
				data,
				{
					Authorization: `Bearer ${token}`
				}
			);
			if (responseData) {
				setNewCurrentUser(responseData.updatedUser);
			}
		} catch (err) {
			// Errors are handled by the useHttpClient method
		}
	};

	useEffect(() => {
		const storedCountry = JSON.parse(localStorage.getItem('countryData'));
		if (storedCountry) {
			setCountryData(storedCountry.countryData);
		}
		return () => {};
	}, []);

	const userData = {
		currentUser,
		countryData,
		setNewCurrentUser,
		updateUser,
		updateUserImg,
		isUpdating: isLoading,
		updatingError: error,
		clearError
	};

	return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};
