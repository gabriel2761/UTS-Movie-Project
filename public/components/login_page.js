import React from 'react';
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
      signUp: false,
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
		self.props.authenticateUser();
	  } else {
		alert(response.data.message);
	  }
	})

	.catch((error) => {
	  console.log(error);
	});
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
        self.props.authenticateUser();
      } else {
        alert(response.data.message);
      }
    })

    .catch((error) => {
      console.log(error);
    })
  }

  _showSignup() {
    this.setState({signUp: true});
  }

  _showLogin() {
    this.setState({signUp: false});
  }

  render() {
    if (this.state.signUp) {
      return (
	<div>
          <form onSubmit={this._signUp.bind(this)}>
            <input type="text" placeholder="Username" ref={username => this.username = username} />
	    <br />
            <input type="text" placeholder="Password" ref={password => this.password = password} />
	    <br />
	    <button type="submit">Signup</button>
          </form>
          <button onClick={this._showLogin.bind(this)}>{"Already have an account? Login Here!"}</button>
        </div>
      );
    } else {
       return (
        <div>
          <form onSubmit={this._login.bind(this)}>
            <input type="text" placeholder="Username" ref={username => this.username = username} />
	    <br />
            <input type="text" placeholder="Password" ref={password => this.password = password} />
	    <br />
	    <button type="submit">Login</button>
          </form>
          <button onClick={this._showSignup.bind(this)}>{"Don't have an account yet? Sign Up Here!"}</button>
        </div>
      );   
    }
  }
}

export default LoginPage;
