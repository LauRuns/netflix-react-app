import { useState, useCallback, useRef, useEffect } from 'react';
import axios from 'axios';

let headersConfig = {
	'x-rapidapi-host': 'unogsng.p.rapidapi.com',
	'x-rapidapi-key': process.env.REACT_APP_MOVIES_KEY,
	useQueryString: true
};

export const useNetflixClient = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState();

	let cancelToken;
	let _isMounted = useRef(null);

	useEffect(() => {
		_isMounted.current = true;
		// eslint-disable-next-line react-hooks/exhaustive-deps
		cancelToken = axios.CancelToken.source();

		return () => {
			setIsLoading(false);
			_isMounted.current = false;
		};
	}, []);

	const fetchNetflixData = useCallback(
		async ({ urlEndpoint, method = 'GET', body = null, params }) => {
			setIsLoading(true);

			axios.interceptors.request.use(
				(config) => {
					return config;
				},
				(err) => {
					throw err;
				}
			);
			axios.interceptors.response.use(
				(response) => {
					return response;
				},
				(err) => {
					if (_isMounted.current) {
						setIsLoading(false);
						if (axios.isCancel(err)) {
							// console.log('Axios isCancel is thrown___:', err.message);
							console.error(err);
						} else if (err.response) {
							// console.log(
							// 	"Voldemort says there's an issue with your Response___:",
							// 	err.response.status
							// );
							setError(err.response.data.message ? err.response.data.message : err.message);
						} else if (err.request) {
							// console.log("Voldemort says there's an issue with your Request___:", err.message);
							setError(err.response.data.message ? err.response.data.message : err.message);
						} else {
							// console.log('Voldemort says Error____:', err.message);
							setError(err.response.data.message ? err.response.data.message : err.message);
						}
					}
					throw err;
				}
			);

			try {
				if (_isMounted.current) {
					const response = await axios({
						method: method,
						url: `https://unogsng.p.rapidapi.com/${urlEndpoint}`,
						data: body,
						headers: headersConfig,
						params: params,
						cancelToken: cancelToken.token
					});

					let responseData;
					if (response?.data) {
						responseData = response.data.results;
					}
					setIsLoading(false);
					return responseData;
				}
			} catch (error) {
				if (_isMounted.current) {
					setError(error.message);
					setIsLoading(false);
				}
				throw error;
			}
		},
		[] // eslint-disable-line react-hooks/exhaustive-deps
	);

	const clearError = () => {
		setError(null);
	};

	return { isLoading, error, fetchNetflixData, clearError };
};
