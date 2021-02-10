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

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/login' />
      </Route>
      <Route path="/login" component={SignInPage}/>
      <Route path="/signUp" component={SignUpPage}/>
      <Route path="/forgotpassword" component={RestorePasswordPage}/>
      <Route path="/legal/terms" component={TermsPage}/>
      <Route path="/legal/privacy" component={PrivacyPage}/>
    </Switch>
  );
}

export default App;
