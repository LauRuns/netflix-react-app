import React, { useEffect, useState } from 'react'

import CountryList from '../../components/Countries/CountryList';
import { useHttpClient } from '../../shared/hooks/http-hook';

const NetflixApp = (props) => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedCountries, setLoadedCountries] = useState();


    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`);
                setLoadedCountries(responseData.results);
            } catch (error) {
                console.log(error);
            }
        };
        fetchCountries();
    }, [sendRequest]);

    return (
        <React.Fragment>
            {loadedCountries && <CountryList items={loadedCountries} />}
        </React.Fragment>
    );
};


export default NetflixApp;
