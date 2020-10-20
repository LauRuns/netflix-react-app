import React from 'react';

import Logo from '../../../../components/Logo/Logo';
import NavItems from '../NavItems/NavItems';
// import Backdrop from '../../UIElements/Backdrop/Backdrop';

import './SideDrawer.css';

const sideDrawer = (props) => {

    let attachClasses = ['SideDrawer', 'Open', 'Close'];

    if (props.open) {
        attachClasses = ['SideDrawer', 'Open']
    }

    return (
        <React.Fragment>
            {/* <Backdrop show={props.open} clicked={props.closed} /> */}
            <div className={attachClasses.join(' ')}>
                <div className="Sidedrawerlogo">
                    <Logo />
                </div>
                <nav onClick={props.navItemClicked}>
                    <NavItems />
                </nav>
            </div>
        </React.Fragment>
    );
};


export default sideDrawer;