import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	const activeHttpRequests = useRef([]);

	const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setIsLoading(true);
		const httpAbortController = new AbortController();
		activeHttpRequests.current.push(httpAbortController);

		// request interceptor
		axios.interceptors.request.use(
			(config) => {
				/*
                perform a task before the request is sent
                - Setting the Authorization token on every request
                */
				return config;
			},
			(err) => {
				// handle the error
				setIsLoading(false);
				throw err;
			}
		);

		// response interceptor
		axios.interceptors.response.use(
			(response) => {
				// perform a task before the response is received
				return response;
			},
			(err) => {
				// handle the error
				setIsLoading(false);
				throw err;
			}
		);

		try {
			const response = await axios({
				method: method,
				url: url,
				data: body,
				headers: headers,
				signal: httpAbortController.signal
			});

			/*
            Using Fetch
            */
			// const response = await fetch(url, {
			// 	method,
			// 	body,
			// 	headers,
			// 	signal: httpAbortController.signal
			// });

			// const responseData = await response.json();

			activeHttpRequests.current = activeHttpRequests.current.filter(
				(reqCtrl) => reqCtrl !== httpAbortController
			);

			const responseData = response.data;

			// if (response.statusText !== 'OK') {
			// 	throw new Error(response.message);
			// }
			setIsLoading(false);
			return responseData;
		} catch (err) {
			// setError(err.messag); // <-- when using fetch as method
			setError(err.response.data.message);
			setIsLoading(false);
			throw error;
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	useEffect(() => {
		return () => {
			activeHttpRequests.current.forEach((abortControl) => abortControl.abort());
		};
	}, []);

	return { isLoading, error, sendRequest, clearError };
};
