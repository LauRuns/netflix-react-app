import React from 'react';
import {
  Route,
  // Redirect,
  Switch
} from 'react-router-dom';

import Auth from './containers/Auth/Auth';
import NetflixApp from './containers/NetflixApp/NetflixApp';
import Account from './containers/Account/Account';
import Layout from './containers/layouts/Layout';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import './App.css';

const App = () => {
  const { token, login, logout, userId } = useAuth();

  if (token) {
    console.log('THIS IS THE TOKEN_____', token);
  } else {
    console.log('_________NO TOKEN________');
  }



  let routes;

  // use this with token verification
  if (token) {
    routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
        <Route path="/" exact component={NetflixApp} />
        <Route path="/account" exact component={Account} />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/auth" exact component={Auth} />
      </Switch>
    )
  }


  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        uderId: userId,
        login: login,
        logout: logout
      }}>
      <Layout>
        {routes}
      </Layout>
    </AuthContext.Provider>

  );
}

export default App;
