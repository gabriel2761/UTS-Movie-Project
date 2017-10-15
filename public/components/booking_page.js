import React from 'react';
import BookingForm from './booking_form.js';
import {Link} from 'react-router-dom';

/**
 * Main Parent component which contains the other components
 * Contains a logged in state which shows the booking page or
 * log in page whether the user logged in. Also holds
 * the number of bookings within a state to be shows to the user.
 */
class BookingPage extends React.Component {
  constructor() {
	super();
	this.state = {
	  loggedIn: false,
	  bookings: []
	};
  }

  _updateBookings() {
	axios.get('/bookings', {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) }
	})
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

  _deleteBooking(id) {
	axios.post('/delete_booking', {
	  bookingId: id
	}, {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	})

	.then((response) => {
	  this._updateBookings();
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  _approveBooking(id) {
  	axios.put('/approve_booking', {
	  bookingId: id
	}, {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	})

	.then((response) => {
	  this._updateBookings();
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  _unapproveBooking(id) {
   	axios.put('/unapprove_booking', {
	  bookingId: id
	}, {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	})

	.then((response) => {
	  this._updateBookings();
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
		<Link to="/logout">Logout</Link>

		<BookingForm updateBookings={this._updateBookings.bind(this)} />
		<ul>
		  {this.state.bookings.map((booking, key) =>
			  <li key={key}>
				  {booking.date} - {booking.time} -
				  Approved: {booking.approved}
				  <button onClick={this._approveBooking.bind(this, booking._id)}>Approve</button>
				  <button onClick={this._unapproveBooking.bind(this, booking._id)}>Un-approve</button>
				  <button onClick={this._deleteBooking.bind(this, booking._id)}>Delete</button>
			  </li>
		  )}
		</ul>
	  </div>
	);
  }
}

export default BookingPage;
