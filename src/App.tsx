import React from 'react';
import './assets/css/fonts.css';
import './assets/css/normalize.css';
import './assets/css/reset.css';
import './assets/css/common.css';
import {Switch, Route, Redirect} from "react-router-dom";
import SignInPage from './pages/SignInPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import RestorePasswordPage from './pages/RestorePasswordPage';
import SignUpPage from './pages/SignUpPage';
import MainPage from 'pages/MainPage';
import {AppRoutes} from './routes';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to={AppRoutes.signIn} />
      </Route>
      <Route path={AppRoutes.signIn} component={SignInPage}/>
      <Route path={AppRoutes.signUp} component={SignUpPage}/>
      <Route path={AppRoutes.restorePassword} component={RestorePasswordPage}/>
      <Route path={AppRoutes.terms} component={TermsPage}/>
      <Route path={AppRoutes.privacy} component={PrivacyPage}/>
      <Route path={AppRoutes.profile} component={MainPage}/>
    </Switch>
  );
}

export default App;
