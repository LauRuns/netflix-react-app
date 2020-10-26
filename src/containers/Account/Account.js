import React, { useState, useEffect } from 'react';

import { useAuth } from '../../shared/hooks/auth-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import Button from '../../shared/components/UIElements/Button/Button';
import ProfileInformation from '../../components/AccountComponents/Profile/ProfileInfo';
import PasswordChange from '../../components/AccountComponents/PasswordChanger/PasswordChange';
import ImageUploader from '../../components/AccountComponents/UploadImage/UploadImage';
import CountrySet from '../../components/AccountComponents/CountrySetter/CountrySetter';
import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import './Account.css';


const UserAccount = (props) => {
    const { userId } = useAuth();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUser, setLoadedUser] = useState();
    const [showProfileInfo, setShowProfileInfo] = useState(false);
    const [showCountrySetter, setShowCountrySetter] = useState(false);
    const [showUploadImage, setShowUploadImage] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [openedDivs, setOpenedDivs] = useState(false);



    useEffect(() => {
        if (!userId) {
            return;
        }
        const fetchUser = async () => {

            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_CONNECTION_STRING}/users/${userId}`);
                setLoadedUser(responseData.result);
                console.log(responseData.result);

            } catch (error) {
                console.log(error);
            }
        };
        fetchUser();
    }, [sendRequest, userId]);

    const showProfileInfoHandler = () => {
        setShowProfileInfo(!showProfileInfo);
    }

    const showCountrySet = () => {
        setShowCountrySetter(!showCountrySetter);
    }

    const showImageUploader = () => {
        setShowUploadImage(!showUploadImage);
    }

    const showPasswordChange = () => {
        setShowChangePassword(!showChangePassword);
    }

    let cardStyle = {
        padding: '1rem',
        backgroundColor: '#515357'
    }

    const liActionsTitles = [
        'Update profile information',
        'Change password',
        'Upload profile image',
        'Set my coutry'
    ];

    const liActions = liActionsTitles.map((action, index) => {
        return <li key={index}>{action}</li>
    });

    const reloadUserData = (newProfileData) => {
        setLoadedUser(newProfileData);
        setShowProfileInfo(false);
    }

    const displayInfoHandler = () => {

        if (!openedDivs) {
            setShowProfileInfo(true);
            setShowCountrySetter(true);
            setShowUploadImage(true);
            setShowChangePassword(true);
            setOpenedDivs(true);
        } else {
            setShowProfileInfo(false);
            setShowCountrySetter(false);
            setShowUploadImage(false);
            setShowChangePassword(false);
            setOpenedDivs(false);
        }
    }

    if (userId) {
        return (
            <React.Fragment>
                {isLoading && (
                    <div className="center">
                        <LoadingSpinner loadingSpinnerMessage="Loading userdata..." />
                    </div>
                )}

                {!isLoading && loadedUser && <div className="container">

                    <div className="item" id="account_header">
                        <h2>Useraccount for {loadedUser.name.toUpperCase()}</h2>
                    </div>

                    <div id="actions">
                        <Avatar
                            image={loadedUser.image ? loadedUser.image : '../../assets/melania-trump.jpg'}
                            alt={loadedUser.name || "Default img"}
                            style={{ width: "200px", height: "200px" }}
                            width="100px"
                            height="100px"
                            className="user-item__image"
                        />

                        {/* <img height="20px" src="../../assets/netflix_hexagon.png" alt="test" /> */}
                    </div>


                    <div className="item" id="item-3">
                        <p>NAME: {loadedUser.name}</p>
                        <p>EMAIL: {loadedUser.email}</p>
                        <p>ID: {loadedUser.id}</p>
                        <p>LAST UPDATED AT: {new Date(loadedUser.updatedAt).toDateString()}</p>
                        <Button type="button" inverse onClick={displayInfoHandler}> {openedDivs ? "CLOSE ALL INFO" : "OPEN ALL INFO"}</Button>
                    </div>

                    <div className="item" id="item-4" >
                        <div onClick={showProfileInfoHandler}>
                            <h3 >Update profile information</h3>
                            <h4>{showProfileInfo ? "CLOSE" : "EDIT"}</h4>
                        </div>
                        {showProfileInfo && <ProfileInformation
                            username={loadedUser.name}
                            email={loadedUser.email}
                            setUpdatedUserData={reloadUserData} />}
                    </div>

                    <div className="item" id="item-5">
                        <div onClick={showCountrySet}>
                            <h3 >Set your country</h3>
                            <h4>{showCountrySetter ? "CLOSE" : "EDIT"}</h4>
                        </div>
                        {showCountrySetter && <CountrySet />}
                    </div>

                    <div className="item" id="item-6">
                        <div onClick={showImageUploader}>
                            <h3 >Upload profile image</h3>
                            <h4>{showUploadImage ? "CLOSE" : "EDIT"}</h4>
                        </div>
                        {showUploadImage && <ImageUploader />}
                    </div>

                    <div className="item" id="item-7">
                        <div onClick={showPasswordChange}>
                            <h3 >Change password</h3>
                            <h4>{showChangePassword ? "CLOSE" : "EDIT"}</h4>
                        </div>
                        {showChangePassword && <PasswordChange />}
                    </div>

                </div>}
            </React.Fragment>
        );

    } else {
        return (
            <div className="container">
                <div className="item" id="item-1">
                    <h2>NO DATA</h2>
                </div>
            </div>
        );
    }

};



export default UserAccount;
