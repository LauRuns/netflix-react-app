import React, { useState, createContext, useCallback } from 'react';
import { useContext } from 'react';

import { useHttpClient } from '../../shared/hooks/http-hook';
import { useAuthentication } from '../../shared/hooks/authentication-hook';

export const UserContext = createContext();

export const useContextUser = () => {
	return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const { token, userId } = useAuthentication();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();

	const setNewCurrentUser = useCallback((user) => {
		setCurrentUser(user);
	}, []);

	const updateUser = async (data) => {
		console.log('updating_____>>', data);

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

	const userData = {
		currentUser,
		setNewCurrentUser,
		updateUser,
		updateUserImg,
		isUpdating: isLoading,
		updatingError: error,
		clearError
	};

	return <UserContext.Provider value={userData}>{children}</UserContext.Provider>;
};
