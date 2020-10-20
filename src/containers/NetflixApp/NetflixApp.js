import React, { useEffect, useState } from 'react'

import CountryList from '../../components/Countries/CountryList';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import Search from '../../components/Search/Search';

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
            <ErrorModal error={error} onClear={clearError} />
            {isLoading && (
                <div className="center">
                    <LoadingSpinner />
                </div>
            )}
            <Search />
            {loadedCountries && <CountryList items={loadedCountries} />}
        </React.Fragment>
    );
};


export default NetflixApp;
