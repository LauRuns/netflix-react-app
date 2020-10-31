/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';

import useAuth from '../../shared/hooks/auth-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';
import Button from '../../shared/components/UIElements/Button/Button';
import ProfileInformation from '../../components/AccountComponents/Profile/ProfileInfo';
import PasswordChange from '../../components/AccountComponents/PasswordChanger/PasswordChange';
import ImageUpload from '../../components/AccountComponents/UploadImage/UploadImage';
import CountrySet from '../../components/AccountComponents/CountrySetter/CountrySetter';
import Avatar from '../../shared/components/UIElements/Avatar/Avatar';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
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

	const [loadedCountries, setLoadedCountries] = useState();

	useEffect(() => {
		if (!userId) {
			return;
		}
		const fetchUser = async () => {
			try {
				const responseData = await sendRequest(
					`${process.env.REACT_APP_CONNECTION_STRING}/users/${userId}`
				);
				setLoadedUser(responseData.result);
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};
		fetchUser();
	}, [sendRequest, userId]);

	useEffect(() => {
		const fetchCountries = async () => {
			try {
				// const responseData = await sendRequest(
				// 	`${process.env.REACT_APP_CONNECTION_STRING}/netflix/countries`
				// );
				// setLoadedCountries(responseData.results);
				setLoadedCountries(null);
			} catch (err) {
				// Error is handled by useHttpClient
			}
		};
		fetchCountries();
	}, [sendRequest]);

	const showProfileInfoHandler = () => {
		setShowProfileInfo(!showProfileInfo);
	};

	const showCountrySet = () => {
		setShowCountrySetter(!showCountrySetter);
	};

	const showImageUploader = () => {
		setShowUploadImage(!showUploadImage);
	};

	const showPasswordChange = () => {
		setShowChangePassword(!showChangePassword);
	};

	const closeAllInfoTabs = () => {
		setShowProfileInfo(false);
		setShowCountrySetter(false);
		setShowUploadImage(false);
		setShowChangePassword(false);
	};

	const reloadUserData = (newProfileData) => {
		setLoadedUser(newProfileData);
		closeAllInfoTabs();
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

	if (userId) {
		return (
			<React.Fragment>
				<ErrorModal error={error} onClear={clearError} />
				{isLoading && (
					<div className="center">
						<LoadingSpinner loadingSpinnerMessage="Loading userdata..." />
					</div>
				)}

				{!isLoading && loadedUser && (
					<div className="container">
						<div className="item" id="account_header">
							<h2>Useraccount for {loadedUser.name.toUpperCase()}</h2>
						</div>

						<div id="actions">
							{loadedUser.image ? (
								<Avatar
									image={loadedUser.image}
									// image={`${process.env.REACT_APP_ASSET_URL}/${props.image}`}
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

						<div className="item" id="item-3">
							<div>
								<p>NAME: {loadedUser.name}</p>
								<p>EMAIL: {loadedUser.email}</p>
								<p>ID: {loadedUser.id}</p>
								<p>SET COUNTRY: {loadedUser.country}</p>
								<p>LAST UPDATED AT: {new Date(loadedUser.updatedAt).toDateString()}</p>
							</div>
							<Button type="button" inverse onClick={displayInfoHandler}>
								{' '}
								{openedDivs ? 'CLOSE ALL INFO' : 'OPEN ALL INFO'}
							</Button>
						</div>

						<div className="item" id="item-4">
							<div onClick={showProfileInfoHandler}>
								<h3>Update profile information</h3>
								<Button noborder size="small" type="button">
									{showProfileInfo ? 'CLOSE' : 'EDIT'}
								</Button>
							</div>
							{showProfileInfo && (
								<ProfileInformation
									username={loadedUser.name}
									email={loadedUser.email}
									country={loadedUser.country}
									setUpdatedUserData={reloadUserData}
								/>
							)}
						</div>

						<div className="item" id="item-5">
							<div onClick={showCountrySet}>
								<h3>
									{loadedUser.country
										? `Your current selected country: ${loadedUser.country}`
										: 'Set your country'}
								</h3>
								<Button noborder size="small" type="button">
									{showCountrySetter ? 'CLOSE' : 'EDIT'}
								</Button>
							</div>
							{showCountrySetter && (
								<CountrySet
									username={loadedUser.name}
									email={loadedUser.email}
									userCountry={loadedUser.country || null}
									setNewSelectedCountry={reloadUserData}
									countryData={loadedCountries}
								/>
							)}
						</div>

						<div className="item" id="item-6">
							<div onClick={showImageUploader}>
								<h3>Upload profile image</h3>
								<Button noborder size="small" type="button">
									{showUploadImage ? 'CLOSE' : 'EDIT'}
								</Button>
							</div>
							{showUploadImage && (
								<ImageUpload username={loadedUser.name} email={loadedUser.email} />
							)}
						</div>

						<div className="item" id="item-7">
							<div onClick={showPasswordChange}>
								<h3>Change password</h3>
								<Button noborder size="small" type="button">
									{showChangePassword ? 'CLOSE' : 'EDIT'}
								</Button>
							</div>
							{showChangePassword && <PasswordChange />}
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

export default UserAccount;
