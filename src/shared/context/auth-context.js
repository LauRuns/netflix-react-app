import { createContext } from 'react';
/* Creating authContext initial set up */
export const AuthContext = createContext({
	isLoggedIn: false,
	userId: null,
	token: null,
	country: null,
	login: () => {},
	logout: () => {},
	updateCountry: () => {}
});
