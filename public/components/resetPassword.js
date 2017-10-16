import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

/**
 * Checks if the password reset token is valid,
 * and if it is, allows the user to reset their
 * password, otherwise redirects to login page
 */
class ResetPassword extends React.Component {
  constructor() {
    super();
    this.state = {
	  loggedIn: false,
	  msg: "",
	  validToken: true,
	};
  }

  _resetPassword(event) {
	var self = this;
	event.preventDefault();

	axios.post('/resetPassword', {
	  password: this.password.value,
	  token: this.props.match.params.token
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

  _checkToken() {
	axios.post('/checkResetToken', {
	  token: this.props.match.params.token
	})

	.then((response) => {
	  this.setState({
	    validToken: response.data
	  });
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  componentWillMount() {
	this._checkToken();
  }

  render() {
	if (!this.state.validToken) {
	  alert('Password reset token not valid');
	  return (<Redirect to={{
	    pathname: '/login',
	  }}/>);
	}

	return (
	  <div>
		<div className="w3-container w3-indigo">
			<h1>Patient Booking System</h1>
		</div>
                <div className="w3-card-4 w3-margin">
		  <div className="w3-container w3-dark-grey">
		    <h3>Password Reset</h3>
		    <h6>Please enter new password:</h6>
		  </div>
		  <form className="w3-container" onSubmit={this._resetPassword.bind(this)}>
		    <p><input className="w3-input w3-border w3-sand" type="password" placeholder="Password" ref={password => this.password = password} /></p>
		    <p><button className="w3-button w3-teal" type="submit">Reset Password</button></p>
		    <p className="alert-msg">{this.state.msg}</p>
		  </form>
		</div>
	  </div>
	 );
  }
}

export default ResetPassword;
