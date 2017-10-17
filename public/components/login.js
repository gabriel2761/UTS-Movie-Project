import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

/**
 * Login form that contains two inputs for the username and password
 * This submits data to the express router which enables the user
 * to log in. If successful, it switches changes the state of parent
 * component to logged in.
 */
class LoginPage extends React.Component {
  constructor() {
    super();
    this.state = {
	  loggedIn: false,
	  admin: false,
	  email: false,
	};
  }

  _login(event) {
	var self = this;
	event.preventDefault();

	axios.post('/login', {
	  username: this.username.value,
	  password: this.password.value
	})

	.then((response) => {
	  console.log(response);
	  if (response.data.success) {
		localStorage.setItem('token', response.data.token);
		this.setState({ 
			loggedIn: true,
			admin: response.data.admin,
			email: response.data.email
		});
	  } else {
		alert(response.data.message);
	  }
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  render() {
	if (this.state.loggedIn) {
	  return (<Redirect to={{
	    pathname: '/',
	    state: {
	      loggedIn: true,
	      admin: this.state.admin,
	      email: this.state.email
	    }
	  }}/>);
	}

	return (
	  <div>
		<div className="w3-container w3-indigo">
			<h1>Patient Booking System</h1>
		</div>
                <div className="w3-card-4 w3-margin">
		  <div className="w3-container w3-dark-grey">
		    <h3>Login</h3>
		  </div>
		  <form className="w3-container" onSubmit={this._login.bind(this)}>
		    <p><input className="w3-input w3-border w3-sand" type="text" placeholder="Email" ref={username => this.username = username} /></p>
		    <p><input className="w3-input w3-border w3-sand" type="password" placeholder="Password" ref={password => this.password = password} /></p>
		    <p><button className="w3-button w3-teal" type="submit">Login</button></p>
		  </form>
		</div>
		<p><Link to="/signup">Don't have an account yet? Sign Up Here!</Link></p>
		<p><Link to="/forgotPassword">Forgot Password?</Link></p>
	  </div>
	 );
  }
}

export default LoginPage;
