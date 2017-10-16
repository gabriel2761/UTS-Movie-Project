import React from 'react';
import ReactDOM from 'react-dom';
import BookingPage from './booking_page.js';
import LoginPage from './login.js';
import RegisterPage from './register.js';
import Logout from './logout.js';
import ForgotPassword from './forgotPassword.js';
import ResetPassword from './resetPassword.js';
import {HashRouter as Router, Route, Redirect} from 'react-router-dom';

/**
 * Renders the Main Component onto app
 */
ReactDOM.render(
  <Router>
	<switch>
	  <Route exact path="/" component={BookingPage}/>
	  <Route path="/login" component={LoginPage}/>
	  <Route path="/signup" component={RegisterPage}/>
	  <Route path="/logout" component={Logout}/>
	  <Route path="/forgotPassword" component={ForgotPassword}/>
	  <Route exact path="/resetPassword" component={BookingPage}/>
	  <Route path="/resetPassword/:token" component={ResetPassword}/>
	</switch>
  </Router>,
  document.getElementById('root')
);
