# React webapp for searching Netflix content

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Contents

- [Description](#description)
- [This is a study project](#this-is-a-study-project)
- [Prerequisites](#prerequisites)
- [How to check if Node is installed?](#how-to-check-if-Node-is-installed?)
- [Set-up guide](#set-up-guide)
- [Environment variables](#environment-variables)
- [Installation](#installation)
- [Demo](#demo)
  - [Login](#login)
  - [...or Sign Up](#...-or-sign-up)
- [Available scripts](#available-cripts)
- [Project state](#project-status)
- [License](#license)

## Description

This React webapp is part of a school/study project. It uses an API, which is part of the project, for user authentication and persisting userdata. The API can be found [here](https://github.com/LauRuns/netflix-api) on this Github.
The app focusses on presenting the user which Netflix content will be deleted and which new content has been added. For this, the app uses a third party API from [Rapidapi](https://rapidapi.com/unogs/api/unogsng) to search and fetch all the content. The user is able to query the API through this app.

## This is a study project

This is just a project for my study. Therefore teachers/instructors will receive a seperate file containing all API-keys and will not need to go through the section: [Set-up guide](##set-up-guide).

## Prerequisites

- It is required that you have Nodejs installed on your machine before installing this project.
- The backend (project API) must be running and configured correctly (See the included README.md in the API Github repo)

### How to check if Node is installed?

Open a terminal and run:

```
node -v
```

This should return a version number, something like: `v12.18.3`

If you do not yet have Node installed you can do so by going to: [https://nodejs.org/en/](https://nodejs.org/en/)
or if you are on a Mac and use Homebrew run:

```
brew install node
```

After installation run the `node -v` command again and verify that Node is installed correct.

## Set-up guide

This app uses the [unogsNG](https://rapidapi.com/unogs/api/unogsng) API. For this you will need to sign up with Rapidapi and create a API-key. This key must be set in the environment variables.

### Environment variables

Create a `.env` and a `.env.production` file in the root folder and enter all environment variables as listed in the `.env-example.txt` which you find in the root folder.

- You will need to set a connection string at which the app will reach out to the API that is part of this overall project. Make sure that the `CONNECTION_STRING` in both the API and Webapp use the same address and port.
- Next you will need to set the `ASSET_URL` which is used to fetch and set the user images/avatar. The `ASSET_URL` does <b>NOT</b> end with `/api`!!<br />
  <img src="https://github.com/LauRuns/readme-gifs/blob/main/rjs/setting-env-rjs.gif?raw=true" alt='Set .env' />

! When building the app, the environment variables from the `.env.production` are used.

# Installation

Clone the project to your designated folder and run

```
npm install
```

All the project dependencies will be installed and a `node_modules` folder is created.

## Demo

After setting the environment variables and having run the `npm install` command, start the app by running the command:

```
npm run start
```

The app is now up and running in the development environment. A confirmation should be presented in the console:
<br />
<img src="https://github.com/LauRuns/readme-gifs/blob/main/rjs/run-rjs.gif?raw=true" alt='Run start for Rjs' width='500'/>

The address that the app is using is presented in the terminal:

```
Local:            http://localhost:3000
On Your Network:  http://192.168.2.30:3000
```

### Login

A browser should be opened automatically, if not open one and navigate to the local or network address that was set by the application. The login page for the app should now be open:<br />

<img src="https://github.com/LauRuns/readme-gifs/blob/main/rjs/rjs-login.gif?raw=true" alt='Login' width='450'/>
<br />

### ...or Sign Up

<img src="https://github.com/LauRuns/readme-gifs/blob/main/rjs/rjs-signup.gif?raw=true" alt='Signup' width='450'/>
<br />
! <i>You can either sign up with a <b>fake</b> or <b>real</b> email address. If an actual email address is used, a notification will be send informing the user of the succesful sign up. This must be configured correctly using the project API with the SaaS transactional email sending set up. (See the included README.md in the API Github repo)</i><br />

## Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload upon saving your edits.<br />

### `npm run test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run lint-check`

Runs a linting check using the eslint and Prettier packages.<br />
A result output is shown in the terminal<br />

### `npm run lint`

Runs a lint correction on all present linting errors.<br />

## Project status

This being a study project means many improvements can be made. Pull requests are welcome!
For now the app is ready to be used and is up and running on a private domain, accessible for teachers, instructors and other students.

## License

This project is not yet licensed.
