import React from 'react';
/**
 * Login form that contains two inputs for the username and password
 * This submits data to the express router which enables the user
 * to log in. If successful, it switches changes the state of parent
 * component to logged in.
 */
class LoginPage extends React.Component {
  _login(event) {
	var self = this;
	event.preventDefault();

	axios.post('/login', {
	  username: this.username.value,
	  password: this.password.value
	})

	.then((response) => {
	  if (response.data) {
		self.props.authenticateUser();
	  } else {
		alert('Incorrect username or password');
	  }
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  render() {
	return (
	  <form onSubmit={this._login.bind(this)}>
		<input type="text" placeholder="Username" ref={username => this.username = username} />
		<br />
		<input type="password" placeholder="Password" ref={password => this.password = password} />
		<br />
		<button type="submit">Login</button>
	  </form>
	);
  }
}

export default LoginPage;
