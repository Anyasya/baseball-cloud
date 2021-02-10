import React from 'react';
import './assets/css/fonts.css';
import './assets/css/normalize.css';
import './assets/css/reset.css';
import './assets/css/common.css';
import {Switch, Route, Redirect} from "react-router-dom";
import SignInPage from './pages/SignInPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';

function App() {
  return (
    <Switch>
      <Route exact path='/'>
        <Redirect to='/login' />
      </Route>
      <Route path="/login" component={SignInPage}/>
      <Route path="/signUp">
        
      </Route>
      <Route path="/forgotpassword">
        
      </Route>
      <Route path="/legal/terms" component={TermsPage}/>
      <Route path="/legal/privacy" component={PrivacyPage}/>
    </Switch>
  );
}

export default App;
