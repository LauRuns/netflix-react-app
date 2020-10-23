import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card/Card';
import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/UIElements/Button/Button';
// import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
    VALIDATOR_EMAIL,
    VALIDATOR_MINLENGTH,
    VALIDATOR_REQUIRE
} from '../../shared/util/validators.js';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/Modal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/Spinner/LoadingSpinner';

import './Auth.css';

const Auth = () => {
    const auth = useContext(AuthContext);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();

    const [formState, inputHandler, setFormData] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const history = useHistory();


    const switchModeHandler = () => {
        if (!isLoginMode) {
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined,
                    image: undefined
                },
                formState.inputs.email.isValid && formState.inputs.password.isValid)
        } else {
            setFormData(
                {
                    ...formState.inputs,
                    name: {
                        value: '',
                        isValid: false
                    },
                    image: {
                        value: null,
                        isValid: false
                    }
                },
                false
            );
        }
        setIsLoginMode(prevMode => !prevMode);
    };

    const authSubmitHandler = async event => {
        event.preventDefault();

        if (isLoginMode) {
            try {
                const responseData = await sendRequest(`${process.env.REACT_APP_CONNECTION_STRING}/users/login`, 'POST',
                    JSON.stringify({
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    }),
                    {
                        'Content-Type': 'application/json'
                    }
                );
                auth.login(responseData.userId, responseData.token);
                history.push('/');

            } catch (error) {
                console.log(error);
            }

        } else {

            try {
                const formData = new FormData();
                formData.append('email', formState.inputs.email.value);
                formData.append('name', formState.inputs.name.value);
                formData.append('password', formState.inputs.password.value);
                formData.append('image', formState.inputs.image.value);

                const responseData = await sendRequest(
                    process.env.REACT_APP_CONNECTION_STRING + '/users/signup',
                    'POST',
                    formData
                );

                auth.login(responseData.userId, responseData.token);

            } catch (error) { }
        }
    };

    let loginCardStyles = {
        backgroundColor: '#000000',
        opacity: .9,
        borderRadius: '4px',
        padding: '3rem 2rem'
    };


    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <div className="backgroundContainer">
                <div className="loginBG">
                </div>
            </div>
            {isLoading && <LoadingSpinner asOverlay loadingSpinnerMessage={'Logging in...'} />}


            <div className="authentication">
                <Card cardStyles={loginCardStyles}>
                    <div className="authentication__header">
                        <h1>Login</h1>
                    </div>
                    <form onSubmit={authSubmitHandler}>
                        {!isLoginMode && (
                            <Input
                                element="input"
                                id="name"
                                type="text"
                                validators={[VALIDATOR_REQUIRE()]}
                                errorText="Please enter a name"
                                onInput={inputHandler}
                                placeholder="Username"

                            />
                        )}
                        {/* {!isLoginMode && (
                        <ImageUpload center id="image" onInput={inputHandler} errorText="Please provide an image." />
                    )} */}

                        <Input
                            element="input"
                            id="email"
                            type="email"
                            validators={[VALIDATOR_EMAIL()]}
                            errorText="Please enter a valid email address."
                            onInput={inputHandler}
                            placeholder="Email"
                        />
                        <Input
                            element="input"
                            id="password"
                            type="password"
                            validators={[VALIDATOR_MINLENGTH(5)]}
                            errorText="Please enter a valid password, min 5 characters."
                            onInput={inputHandler}
                            placeholder="Password"

                        />
                        <Button id="loginButton" type="submit" disabled={!formState.isValid}>
                            {isLoginMode ? 'LOGIN' : 'SIGNUP'}
                        </Button>
                    </form>
                    <Button inverse onClick={switchModeHandler}>
                        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIIN'}
                    </Button>
                </Card>
            </div>

        </React.Fragment>
    );
};

export default Auth;
