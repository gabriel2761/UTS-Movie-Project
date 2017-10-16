import React from 'react';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

class RegisterPage extends React.Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    };
  }

  _signUp(event) {
    var self = this;
    event.preventDefault();

    axios.post('/signup', {
      username: this.username.value,
      password: this.password.value,
    })

    .then((response) => {
      if (response.data.success) {
	this.setState({ loggedIn: true });
      } else {
        alert(response.data.message);
      }
    })

    .catch((error) => {
      console.log(error);
    })
  }

  render() {
	if (this.state.loggedIn) {
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
		    <h3>Register</h3>
		  </div>
		  <form className="w3-container" onSubmit={this._signUp.bind(this)}>
		    <p><input className="w3-input w3-border w3-sand" type="text" placeholder="Email" ref={username => this.username = username} /></p>
		    <p><input className="w3-input w3-border w3-sand" type="password" placeholder="Password" ref={password => this.password = password} /></p>
		    <p><button className="w3-button w3-teal" type="submit">Signup</button></p>
		  </form>
		</div>
		<Link to="/login">Already have an account? Login Here!</Link>
	  </div>
	);

  }
}

export default RegisterPage;
