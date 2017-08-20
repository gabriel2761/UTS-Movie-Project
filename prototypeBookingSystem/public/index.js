class BookingForm extends React.Component {
  render() {
	return (
	  <div>
		<form onSubmit={this._submitBooking.bind(this)}>
		  <input type="date" ref={date => this.date = date} />
		  <br />
		  <input type="time" ref={time => this.time = time} />
		  <br />
		  <button type="submit">Book</button>
		</form>
	  </div>
	);
  }

  _submitBooking(event) {
	var self = this;
	event.preventDefault();

	axios.post('/book', {
	  date: this.date.value,
	  time: this.time.value
	})

	.then((response) => {
	  self.props.updateBookings();
	})

	.catch((error) => {
	  console.log(error);
	});
  }
}

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
	  console.log('error happens');
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

class BookingPage extends React.Component {
  constructor() {
	super();
	this.state = {
	  loggedIn: false,
	  bookings: []
	};
  }

  _updateBookings() {
	axios.get('/bookings')
	.then((response) => {
	  this.setState({
		bookings: response.data
	  });
	})
	.catch((error) => {
	  console.log(error);
	});
  }

  _setLoggedIn() {
	this.setState({ loggedIn: true });
  }

  componentDidMount() {
	this._updateBookings();
  }

  render() {
	if (this.state.loggedIn) {
	  return (
		<div>
		  <BookingForm updateBookings={this._updateBookings.bind(this)} />
		  <ul>
			{this.state.bookings.map((booking, key) => <li key={key}>{booking.date} - {booking.time}</li>)}
		  </ul>
		</div>
	  );
	} else {
	  return(
		<LoginPage authenticateUser={this._setLoggedIn.bind(this)} />
	  );
	}
  }
}

ReactDOM.render(
  <BookingPage />,
  document.getElementById('root')
);
