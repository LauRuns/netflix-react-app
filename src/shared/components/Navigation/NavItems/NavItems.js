import React, { useContext } from 'react';

import { AuthContext } from '../../../context/auth-context';
import NavItem from './NavItem/NavItem';
import Icon from '.././../../../components/Icon/Icon';

import './NavItems.css';
import LogoutLogo from '../../../../assets/log-out.svg';



const NavItems = (props) => {

    const auth = useContext(AuthContext);

    console.log(props.drawerIsOpen);

    return (
        <ul className="NavigationItems">
            {!auth.isLoggedIn && <NavItem link="/auth" >Login</NavItem>}
            {auth.isLoggedIn && <NavItem link="/" >Countries</NavItem>}
            {auth.isLoggedIn && <NavItem link="/account" >MyAccount</NavItem>}
            {auth.isLoggedIn && (
                props.drawerIsOpen ?
                    <div onClick={auth.logout} >
                        <strong><p>Logout</p></strong>
                    </div>
                    :
                    <div id="LogoutIcon" className="Icon" onClick={auth.logout}>
                        <img src={LogoutLogo} alt="Logout icon" />
                    </div>
            )}
        </ul>
    );
};


export default NavItems;
