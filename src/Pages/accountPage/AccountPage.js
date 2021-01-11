/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
/* Hooks and context */
import { useAuthentication } from '../../shared/hooks/authentication-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { useContextUser } from '../../shared/context/user-context';
/* UI elements and components */
import {
	Button,
	LoadingSpinner,
	Avatar,
	Modal,
	ErrorModal,
	IconButton
} from '../../components/uiElements';
import {
	CountrySetter,
	PasswordChange,
	ProfileInfo,
	UploadImage
} from '../../components/organisms';
/* Styling */
import './AccountPage.scss';

/* Presents the user with user details and enables changing them */
export const AccountPage = () => {
	const { isAuthenticated, token } = useAuthentication();
	const { currentUser, setNewCurrentUser, isUpdating, updatingError } = useContextUser();
	const { isLoading, error, sendRequest, clearError } = useHttpClient();
	let { userId } = useParams();
	const _isMounted = useRef(null);

	/*
    Fetches the userdata based on user ID -> set in MainNavigation.
    Alternatively the user ID can be retrevied from useAthentication context
    */
	const fetchUser = useCallback(async () => {
		console.log('userID___:', userId);
		try {
			const responseData = await sendRequest(
				`${process.env.REACT_APP_CONNECTION_STRING}/users/${userId}`,
				'GET',
				null,
				{
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`
				}
			);
			const { result } = responseData;
			if (_isMounted.current) {
				setNewCurrentUser(result);
			}
		} catch (err) {
			// Error is handled by useHttpClient
		}
	}, [sendRequest, userId, setNewCurrentUser, token]);

	/* Scrolls to the top when alle info tabs for changing user details are being closed or when isLoading / isUpdating is true */
	useEffect(() => {
		closeAllInfoTabs();
		window.scrollTo(0, 0);
	}, [isLoading, isUpdating]);

	/* Fetch the user when component is mounted */
	useEffect(() => {
		_isMounted.current = true;
		fetchUser();
		return () => {
			_isMounted.current = false;
		};
	}, [isAuthenticated, userId, fetchUser]);

	const [showProfileInfo, setShowProfileInfo] = useState(false);
	const [showCountrySetter, setShowCountrySetter] = useState(false);
	const [showUploadImage, setShowUploadImage] = useState(false);
	const [showChangePassword, setShowChangePassword] = useState(false);
	const [displayMessage, setDisplayMessage] = useState(false);

	/* Opens or closes individual sections for updating userdata */
	const showProfileInfoHandler = () => setShowProfileInfo(!showProfileInfo);
	const showCountrySet = () => setShowCountrySetter(!showCountrySetter);
	const showImageUploader = () => setShowUploadImage(!showUploadImage);
	const showPasswordChange = () => setShowChangePassword(!showChangePassword);

	/* Opens all sections for changing user data */
	const closeAllInfoTabs = () => {
		setShowProfileInfo(false);
		setShowCountrySetter(false);
		setShowUploadImage(false);
		setShowChangePassword(false);
	};

	/* Closes all sections for changing user data */
	const openAllInfoTabs = () => {
		setShowProfileInfo(true);
		setShowCountrySetter(true);
		setShowUploadImage(true);
		setShowChangePassword(true);
	};

	const openModal = () => {
		showPasswordChange();
		setDisplayMessage(true);
	};
	const closeModal = () => {
		setDisplayMessage(false);
	};

	if (userId && isAuthenticated) {
		return (
			<React.Fragment>
				<ErrorModal error={error || updatingError} onClear={clearError} />
				<Modal
					show={displayMessage}
					header="Password updated!"
					footer={
						<Button type="button" inverse onClick={closeModal}>
							OK
						</Button>
					}
				/>
				{isLoading ||
					(isUpdating && <LoadingSpinner asOverlay loadingSpinnerMessage="Updating userdata..." />)}

				{currentUser && (
					<div id="account__container">
						<div id="account-header" className="account__header">
							<h2>Useraccount for {currentUser.name.toUpperCase()}</h2>
						</div>

						<div id="account-avatar" className="account__avatar">
							{currentUser && (
								<Avatar
									image={currentUser.image}
									alt={currentUser.name || 'Default img'}
									style={{ width: '200px', height: '200px' }}
									width="200px"
									height="200px"
									className="user-item__image"
								/>
							)}
						</div>

						<div id="account-user-info" className="account__user__info">
							<div>
								<p>NAME: {currentUser.name}</p>
								<p>EMAIL: {currentUser.email}</p>
								<p>ID: {currentUser.id}</p>
								<p>SET COUNTRY: {currentUser?.country?.country}</p>
								<p>LAST UPDATED AT: {new Date(currentUser.updatedAt).toDateString()}</p>
							</div>
							<IconButton
								icon={
									showChangePassword || showCountrySetter || showUploadImage || showProfileInfo
										? 'close'
										: 'list'
								}
								before
								type="button"
								inverse
								iconStyle={{ marginRight: '.5rem' }}
								onClick={
									showChangePassword || showCountrySetter || showUploadImage || showProfileInfo
										? closeAllInfoTabs
										: openAllInfoTabs
								}
							>
								{showChangePassword || showCountrySetter || showUploadImage || showProfileInfo
									? 'CLOSE ALL INFO'
									: 'OPEN ALL INFO'}
							</IconButton>
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
							{showProfileInfo && <ProfileInfo />}
						</div>

						<div id="account-set-country" className="account__country__setter">
							<div>
								<h3>
									{currentUser.country
										? `Current country: ${currentUser.country.country}`
										: 'Set your country'}
								</h3>
								<IconButton
									icon={showCountrySetter ? 'cancel' : 'edit'}
									iconSize={20}
									iconColor="#fff"
									onClick={showCountrySet}
									noborder
									iconStyle={{ marginLeft: '.5rem' }}
								>
									{showCountrySetter ? 'CLOSE' : 'EDIT'}
								</IconButton>
							</div>
							{showCountrySetter && <CountrySetter />}
						</div>

						<div id="account-update-avatar" className="account__update__avatar">
							<div>
								<h3>Upload profile image</h3>
								<IconButton
									icon={showUploadImage ? 'cancel' : 'edit'}
									iconSize={20}
									iconColor="#fff"
									onClick={showImageUploader}
									noborder
									iconStyle={{ marginLeft: '.5rem' }}
								>
									{showUploadImage ? 'CLOSE' : 'EDIT'}
								</IconButton>
							</div>
							{showUploadImage && <UploadImage />}
						</div>

						<div id="account-change-password" className="account__change__pwd">
							<div>
								<h3>Change password</h3>
								<IconButton
									icon={showChangePassword ? 'cancel' : 'edit'}
									iconSize={20}
									iconColor="#fff"
									onClick={showPasswordChange}
									noborder
									iconStyle={{ marginLeft: '.5rem' }}
								>
									{showChangePassword ? 'CLOSE' : 'EDIT'}
								</IconButton>
							</div>
							{showChangePassword && (
								<PasswordChange
									username={currentUser.name}
									email={currentUser.email}
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
