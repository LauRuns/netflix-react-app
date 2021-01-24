import React, { useState, createContext, useCallback, useEffect } from 'react';
import { useContext } from 'react';
/* Hooks and context imports */
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthState } from '../../shared/context/auth-context';
/* Create context */
export const UserContext = createContext();
export const useContextUser = () => {
	return useContext(UserContext);
};
/* Create provider that wraps it children */
export const UserContextProvider = ({ children }) => {
	const [activeUser, setActiveUser] = useState({
		user: null
	});
	const [countryData, setCountryData] = useState(null);
	const { token, userId } = useAuthState();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	/* Set the logged in user in the context */
	const setActiveUserHandler = useCallback((data) => {
		setActiveUser({
			...activeUser,
			user: {
				userId: data._id,
				userName: data.name,
				email: data.email,
				avatar: data.image,
				country: data.country,
				updatedAt: data.updatedAt
			}
		});

		if (data.country) {
			setCountryData(data.country);
			localStorage.setItem(
				'countryData',
				JSON.stringify({
					countryData: data.country
				})
			);
		}
	}, []);

	/* Clears the activeUser */
	const clearActiveUserHandler = () => {
		setActiveUser({
			user: null
		});
	};

	/* Make PATCH call to the backend for updating the user */
	const updateUserHandler = async (data) => {
		const { country, username, email } = data;
		try {
			/* sendRequest is method provided by the useHttpClient hook */
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${userId}`,
				'PATCH',
				JSON.stringify({
					username: username || activeUser.user.userName,
					email: email || activeUser.user.email,
					country: country ? { ...country } : activeUser.user.country
				}),
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			if (responseData) {
				setActiveUserHandler(responseData.updatedUser);
			}
		} catch (err) {
			// Error is handled by the useHttpClient
		}
	};

	/* Make PATCH call to the backend and update only the user avatar (image) */
	const updateUserImgHandler = async (data) => {
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
				setActiveUserHandler(responseData.updatedUser);
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
		activeUser,
		countryData,
		setActiveUserHandler,
		updateUserHandler,
		updateUserImgHandler,
		isUpdating: isLoading,
		updatingError: error,
		clearError,
		clearActiveUserHandler
	};

	return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};
