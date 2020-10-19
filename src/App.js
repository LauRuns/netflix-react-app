import React from 'react';
import {
  Route,
  // Redirect,
  Switch
} from 'react-router-dom';

import NetflixApp from './containers/NetflixApp/NetflixApp';
import Account from './containers/Account/Account';
import Layout from './containers/layouts/Layout';

import './App.css';

const App = () => {
  // const { token, login, logout, userId } = useAuth();

  let routes;

  // use this with token verification
  if (true) {
    routes = (
      <Switch>
        <Route path="/" exact component={NetflixApp} />
        <Route path="/account" exact component={Account} />
      </Switch>
    )
  } else {
    routes = (
      <Switch>
        <Route path="/" exact component={NetflixApp} />
      </Switch>
    )
  }


  return (
    <Layout>
      {routes}
    </Layout>
  );
}

export default App;
