import React from 'react';
import Navbar from '../../shared/components/Navigation/Navbar/Navbar';

import './Layout.css';


const Layout = props => {
    return (
        <React.Fragment>
            <Navbar />
            {<main className="Content">{props.children}</main>}
        </React.Fragment>
    );
};


export default Layout;
