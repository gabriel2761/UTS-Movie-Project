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



class BookingPage extends React.Component {
  constructor() {
	super();
	this.state = {
	  bookings: []
	};
  }

  _updateBookings() {
	axios.get('/bookings')
	.then((response) => {
	  this.setState({
		bookings: response.data
	  });

	  console.log(this.state.bookings);
	})
	.catch((error) => {
	  console.log(error);
	});
  }

  componentDidMount() {
	this._updateBookings();
  }

  render() {
	return (
	  <div>
		<BookingForm updateBookings={this._updateBookings.bind(this)} />
		<ul>
		  {this.state.bookings.map((booking, key) => <li key={key}>{booking.date} - {booking.time}</li>)}
		</ul>
	  </div>
	);
  }
}

ReactDOM.render(
  <BookingPage />,
  document.getElementById('root')
);
