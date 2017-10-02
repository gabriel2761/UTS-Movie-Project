import React from 'react';
import {Link, Redirect} from 'react-router-dom';

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
	  loggedIn: false
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
	  if (response.data.success) {
		localStorage.setItem('token', response.data.token);
		this.setState({ loggedIn: true });
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
	  return (<Redirect to="/"/>);
	}

	return (
	  <div>
		<form onSubmit={this._login.bind(this)}>
		  <input type="text" placeholder="Username" ref={username => this.username = username} />
		  <br />
		  <input type="text" placeholder="Password" ref={password => this.password = password} />
		  <br />
		  <button type="submit">Login</button>
		</form>

		<Link to="/register">Don't have an account yet? Sign Up Here!</Link>
	  </div>
	 );
  }
}

export default LoginPage;
