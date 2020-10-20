import React from 'react';

import './Icon.css';

const Icon = (props) => {
    return (
        <div className="Icon">
            <img src={props.icon} alt={props.altIcon} />
        </div>
    );
};


export default Icon;
