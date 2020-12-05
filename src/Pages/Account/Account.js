/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useContext } from 'react';

import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import Button from '../../shared/components/UIElements/Button/Button';
import {
	CountrySetter,
	PasswordChange,
	ProfileInfo,
	UploadImage
} from '../../components/organisms';

import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import './Account.scss';

import { IconButton } from '../../shared/components/UIElements/iconButton/IconButton';
import { testCountryList } from '../../assets/testitems';

export const UserAccount = () => {
	const auth = useContext(AuthContext);
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	const [loadedUser, setLoadedUser] = useState();
	const [showProfileInfo, setShowProfileInfo] = useState(false);
	const [showCountrySetter, setShowCountrySetter] = useState(false);
	const [showUploadImage, setShowUploadImage] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [openedDivs, setOpenedDivs] = useState(false);

	const [loadedCountries, setLoadedCountries] = useState();
	const [displayMessage, setDisplayMessage] = useState(false);

	const fetchUser = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${auth.userId}`
			);
			const { result } = responseData;
			console.log(result);
			setLoadedUser(result);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	const fetchCountries = async () => {
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
			);
			setLoadedCountries(responseData.results);
		} catch (err) {
			// Error is handled by useHttpClient
		}
	};

	useEffect(() => {
		if (!auth.userId) {
			return;
		}
		fetchUser();
		// fetchCountries();
	}, [sendRequest, auth.userId]);

	const showProfileInfoHandler = () => setShowProfileInfo(!showProfileInfo);
	const showCountrySet = () => setShowCountrySetter(!showCountrySetter);
	const showImageUploader = () => setShowUploadImage(!showUploadImage);
	const showPasswordChange = () => setShowChangePassword(!showChangePassword);

	const closeAllInfoTabs = () => {
		setShowProfileInfo(false);
		setShowCountrySetter(false);
		setShowUploadImage(false);
		setShowChangePassword(false);
	};

	const reloadUserData = (newProfileData) => {
		setLoadedUser(newProfileData);
		closeAllInfoTabs();
		updateLocalStorageUserData(newProfileData.country);
		auth.updateCountry(newProfileData.country);
	};

	const updateLocalStorageUserData = (countryObj) => {
		const getCountry = JSON.parse(localStorage.getItem('userData'));
		getCountry.country = countryObj;
	};

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
	};

	const openModal = () => {
		showPasswordChange();
		setDisplayMessage(true);
	};
	const closeModal = () => {
		setDisplayMessage(false);
	};

	if (auth.userId) {
		return (
			<React.Fragment>
				<ErrorModal error={error} onClear={clearError} />
				<Modal
					show={displayMessage}
					header="Password updated!"
					footer={
						<Button type="button" inverse onClick={closeModal}>
							OK
						</Button>
					}
				/>
				{isLoading && <LoadingSpinner loadingSpinnerMessage="Loading userdata..." asOverlay />}

				{!isLoading && loadedUser && (
					<div id="account__container">
						<div id="account-header" className="account__header">
							<h2>Useraccount for {loadedUser.name.toUpperCase()}</h2>
						</div>

						<div id="account-avatar" className="account__avatar">
							{loadedUser.image ? (
								<Avatar
									image={loadedUser.image}
									alt={loadedUser.name || 'Default img'}
									style={{ width: '200px', height: '200px' }}
									width="200px"
									height="200px"
									className="user-item__image"
								/>
							) : (
								<p>No image data</p>
							)}
						</div>

						<div id="account-user-info" className="account__user__info">
							<div>
								<p>NAME: {loadedUser.name}</p>
								<p>EMAIL: {loadedUser.email}</p>
								<p>ID: {loadedUser.id}</p>
								<p>SET COUNTRY: {loadedUser.country.country}</p>
								<p>LAST UPDATED AT: {new Date(loadedUser.updatedAt).toDateString()}</p>
							</div>
							<Button type="button" inverse onClick={displayInfoHandler}>
								{' '}
								{openedDivs ? 'CLOSE ALL INFO' : 'OPEN ALL INFO'}
							</Button>
						</div>

						<div id="account-update-profile" className="account__update__profile">
							<div>
								<h3>Update profile information</h3>
								<IconButton
									icon={showProfileInfo ? 'cancel' : 'edit'}
									iconSize={20}
									iconColor="#fff"
									onClick={showProfileInfoHandler}
									noborder
									iconStyle={{ marginLeft: '.5rem' }}
								>
									{showProfileInfo ? 'CLOSE' : 'EDIT'}
								</IconButton>
							</div>
							{showProfileInfo && (
								<div className="itm-4-profile">
									<ProfileInfo
										username={loadedUser.name}
										email={loadedUser.email}
										country={loadedUser.country}
										setUpdatedUserData={reloadUserData}
									/>
								</div>
							)}
						</div>

						<div id="account-set-country" className="account__country__setter">
							<div>
								<h3>
									{loadedUser.country
										? `Current country: ${loadedUser.country.country}`
										: 'Set your country'}
								</h3>
								<IconButton
									icon={showProfileInfo ? 'cancel' : 'edit'}
									iconSize={20}
									iconColor="#fff"
									onClick={showCountrySet}
									noborder
									iconStyle={{ marginLeft: '.5rem' }}
								>
									{showCountrySetter ? 'CLOSE' : 'EDIT'}
								</IconButton>
							</div>
							{showCountrySetter && loadedUser && (
								<CountrySetter
									// username={loadedUser.name}
									// email={loadedUser.email}
									// userCountry={loadedUser.country || null}
									userData={loadedUser}
									setNewSelectedCountry={reloadUserData}
									// countryData={loadedCountries}
									countryData={testCountryList} // <-- development data
								/>
							)}
						</div>

						<div id="account-update-avatar" className="account__update__avatar">
							<div onClick={showImageUploader}>
								<h3>Upload profile image</h3>
								<IconButton
									icon={showProfileInfo ? 'cancel' : 'edit'}
									iconSize={20}
									iconColor="#fff"
									onClick={showImageUploader}
									noborder
									iconStyle={{ marginLeft: '.5rem' }}
								>
									{showUploadImage ? 'CLOSE' : 'EDIT'}
								</IconButton>
							</div>
							{showUploadImage && (
								<UploadImage
									username={loadedUser.name}
									email={loadedUser.email}
									setUpdatedUserAvatar={reloadUserData}
								/>
							)}
						</div>

						<div id="account-change-password" className="account__change__pwd">
							<div onClick={showPasswordChange}>
								<h3>Change password</h3>
								<IconButton
									icon={showProfileInfo ? 'cancel' : 'edit'}
									iconSize={20}
									iconColor="#fff"
									onClick={setShowChangePassword}
									noborder
									iconStyle={{ marginLeft: '.5rem' }}
								>
									{showChangePassword ? 'CLOSE' : 'EDIT'}
								</IconButton>
							</div>
							{showChangePassword && (
								<PasswordChange
									username={loadedUser.name}
									email={loadedUser.email}
									closeSection={openModal}
								/>
							)}
						</div>
					</div>
				)}
			</React.Fragment>
		);
	}
	return (
		<div className="container">
			<div className="item" id="item-1">
				<h2>NO DATA</h2>
			</div>
		</div>
	);
};
