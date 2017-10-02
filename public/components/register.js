import React from 'react';
import {Link} from 'react-router-dom';

class RegisterPage extends React.Component {
  constructor() {
    super();
    this.state = {};
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

      } else {
        alert(response.data.message);
      }
    })

    .catch((error) => {
      console.log(error);
    })
  }

  render() {
	return (
	  <div>
		<form onSubmit={this._signUp.bind(this)}>
		  <input type="text" placeholder="Username" ref={username => this.username = username} />
		  <br />
		  <input type="text" placeholder="Password" ref={password => this.password = password} />
		  <br />
		  <button type="submit">Signup</button>
		</form>

		<Link to="/Login">Already have an account? Login Here!</Link>
	  </div>
	);

  }
}

export default RegisterPage;
