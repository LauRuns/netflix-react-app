import React from 'react';

import './DrawerToggle.css';


const drawerToggle = (props) => {
    return (
        <div className="menu-container" onClick={props.clicked}>
            <div id="menu"></div>
        </div>
        // <div className="DrawerToggle" onClick={
        //     props.clicked
        // }>
        //     <div></div>
        //     <div></div>
        //     <div></div>
        // </div>
    );
}




export default drawerToggle;