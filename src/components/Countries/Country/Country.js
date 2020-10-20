import React from 'react';

import Card from '../../../shared/components/UIElements/Card/Card';
import './Country.css';

const country = (props) => {
    return (
        <li>
            <Card>
                <h3>Available country: {props.country}</h3>
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nulla, modi.</p>
            </Card>
        </li>
    );
};


export default country;
