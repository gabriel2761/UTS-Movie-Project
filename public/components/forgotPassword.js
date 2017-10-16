import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

/**
 * Form to request password reset. Takes the email provided
 * by the user and then sends it to backend which
 * will generate a reset token and email it to user
 * with link.
 */
class ForgotPassword extends React.Component {
  constructor() {
    super();
    this.state = {
	  loggedIn: false,
	  msg: ""
	};
  }

  _requestReset(event) {
	var self = this;
	event.preventDefault();

	axios.post('/requestReset', {
	  username: this.username.value,
	})

	.then((response) => {
	  this.setState({
	    msg: response.data
	  });
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  render() {
	if (this.state.loggedIn) {
	  return (<Redirect to={{
	    pathname: '/',
	    state: {loggedIn: true}
	  }}/>);
	}

	return (
	  <div>
		<div className="w3-container w3-indigo">
			<h1>Patient Booking System</h1>
		</div>
                <div className="w3-card-4 w3-margin">
		  <div className="w3-container w3-dark-grey">
		    <h3>Request Password Reset</h3>
		    <h6>Please enter your email:</h6>
		  </div>
		  <form className="w3-container" onSubmit={this._requestReset.bind(this)}>
		    <p><input className="w3-input w3-border w3-sand" type="text" placeholder="Email" ref={username => this.username = username} /></p>
		    <p><button className="w3-button w3-teal" type="submit">Request Reset Email</button></p>
		    <p className="alert-msg">{this.state.msg}</p>
		  </form>
		</div>
		<p><Link to="/login">Remember your password? Login here!</Link></p>
		<p><Link to="/signup">Don't have an account yet? Sign Up Here!</Link></p>
	  </div>
	 );
  }
}

export default ForgotPassword;
