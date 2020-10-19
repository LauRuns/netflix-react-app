import React from 'react';

import './Logo.css';
import NetflixLogo from '../../assets/netflix_hexagon.png';

const logo = (props) => {
    return (
        <div className="Logo">
            <img src={NetflixLogo} alt="Netflix-logo" />
        </div>
    );
};



export default logo;
