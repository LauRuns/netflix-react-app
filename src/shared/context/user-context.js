import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useContext } from 'react';
/* Hooks imports */
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';
/* Create context */
export const UserContext = createContext();
export const useContextUser = () => {
	return useContext(UserContext);
};
/* Create provider that wraps it children */
export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const [countryData, setCountryData] = useState(null);
	const { token, userId } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	/* Set the logged in user in the context */
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
			/* Using session iso local storage - optional */
			// sessionStorage.setItem(
			// 	'countryData',
			// 	JSON.stringify({
			// 		countryData: user.country
			// 	})
			// );
		}
	}, []);

	/* Make PATCH call to the backend for updating the user */
	const updateUser = async (data) => {
		const { country, username, email } = data;
		try {
			/* sendRequest is method provided by the useHttpClient hook */
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

	/* Make PATCH call to the backend and update only the user avatar (image) */
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

	/* Takes the country data object from the local storage and sets it in state */
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
