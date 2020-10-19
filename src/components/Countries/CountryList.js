import React from 'react';

import Country from './Country/Country';
import './CountryList.css';


const CountryList = props => {
    return (
        <React.Fragment>
            <ul className="CountryList">
                <Country />
            </ul>
        </React.Fragment>

    );
};



export default CountryList;
