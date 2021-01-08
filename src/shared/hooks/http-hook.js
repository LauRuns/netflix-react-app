import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

export const useHttpClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();
	let signal;
	let isMounted = useRef(null);

	useEffect(() => {
		isMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
		signal = axios.CancelToken.source();
		return () => {
			signal.cancel('The request was cancelled!');
			setIsLoading(false);
			isMounted.current = false;
		};
	}, []);

	const sendRequest = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setIsLoading(true);
		try {
			/* Perform a task before the request is sent */
			axios.interceptors.request.use(
				(config) => {
					return config;
				},
				(err) => {
					throw err;
				}
			);

			/* Perform a task before the response is passed on */
			axios.interceptors.response.use(
				(response) => {
					return response;
				},
				(err) => {
					if (isMounted.current) {
						setIsLoading(false);
						if (axios.isCancel(err)) {
							console.log('Axios isCancel is thrown___:', err.message);
						} else if (err.response) {
							console.log(
								"Voldemort says there's an issue with your Response___:",
								err.response.status
							);
							setError(err.response.data.message ? err.response.data.message : err.message);
						} else if (err.request) {
							console.log("Voldemort says there's an issue with your Request___:", err.message);
							setError(err.response.data.message ? err.response.data.message : err.message);
						} else {
							console.log('Voldemort says Error____:', err.message);
							setError(err.response.data.message ? err.response.data.message : err.message);
						}
					}
					throw err;
				}
			);

			if (isMounted.current) {
				const response = await axios({
					method: method,
					url: url,
					data: body,
					headers: headers,
					cancelToken: signal.token
				});
				let responseData;
				if (response?.data) {
					responseData = response.data;
				}
				setIsLoading(false);
				return responseData;
			}
		} catch (err) {
			setError(err.response.data.message ? err.response.data.message : err.message);
			setIsLoading(false);
			throw err;
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const clearError = () => {
		setError(null);
	};

	return { isLoading, error, sendRequest, clearError };
};
