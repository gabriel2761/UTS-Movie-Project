import React from 'react';
import BookingForm from './booking_form.js';
import AdminBookingForm from './admin_booking_form.js';
import Weather from './weather.js';
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';

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
	  admin: false,
	  email: null,
	  bookings: [],
	  bookingsMsg: ""
	};
  }

  _updateBookings() {
	axios.get('/bookings', {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	  params: {
	    email: this.state.email
	  }
	})

	.then((response) => {
	  if (response.data[0].time === 'No bookings found') {
	    this.setState({
	      bookingsMsg: response.data[0].time
	    });
	  } else {
	    this.setState({
	  	bookings: response.data,
		bookingsMsg: "",
	    });
	  }
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  _adminUpdateBookings() {
	axios.get('/adminBookings', {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	  params: {
	    email: this.state.email
	  }
	})

	.then((response) => {
	  console.log(response.data);
	  if (response.data.length < 1) {
	    this.setState({
	      bookingsMsg: 'No bookings found'
	    });
	  }
	  this.setState({
		bookings: response.data
	  });
	})

	.catch((error) => {
	  console.log(error);
	});

  }

  _deleteBooking(id) {
	axios.post('/delete_booking', {
	  bookingId: id
	}, {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	})

	.then((response) => {
	  this._adminUpdateBookings();
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
	  this._adminUpdateBookings();
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
	  this._adminUpdateBookings();
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  _cancelBooking(id) {
	axios.put('/cancelBooking', {
	  id: id,
	  email: this.state.email,
	}, {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	})
	
	.then((response) => {
	  this.setState({
	    bookingsMsg: response.data
	  });
	  this._updateBookings();
	})

	.catch((error) => {
	  console.log(error);
	});
  }

  _createUser() {
  
  }

  _getEmail() {
    return this.state.email;
  }

  componentWillMount() {
    if (this.props.location.state !== undefined) {
      this.setState({
        loggedIn: this.props.location.state.loggedIn,
        admin: this.props.location.state.admin,
	email: this.props.location.state.email
      });
    }
  }

  componentDidMount() {
	if (this.state.loggedIn) {
		if (this.state.admin) {
			this._adminUpdateBookings();
		} else {
			this._updateBookings();
		}
	}
  }

  render() {
	if (!this.state.loggedIn) {
	  return (<Redirect to="/login" />);
	} else if (this.state.admin) {
	  return (
	    <div>
	      <div className="w3-container w3-indigo">
		<h1>Patient Booking System</h1>
		<h5>Admin User</h5>
		<Link to='/logout'>Logout</Link>
	      </div>
	      <div className="w3-card-4 w3-margin">
	        <div className="w3-container w3-dark-grey">
		  <h3>Create User</h3>
		</div>
		<form className="w3-container" onSubmit={this._createUser.bind(this)}>
		  <p><input className="w3-input w3-border w3-sand" type="text" placeholder="Email" ref={username => this.username = username} /></p>
		  <p><input className="w3-input w3-border w3-sand" type="password" placeholder="Password" ref={password => this.password = password} /></p>
		  <p>Admin User: <input type="checkbox" value="admin"/></p>
		  <p><button className="w3-button w3-teal" type="submit">Create User</button></p>
		</form>
	      </div>
	      <AdminBookingForm getEmail={this._getEmail.bind(this)} adminUpdateBookings={this._adminUpdateBookings.bind(this)} />
	      <div className="w3-card-4 w3-margin">
	        <table className="w3-table-all">
	          <thead>
		    <tr className="w3-dark-grey">
		      <th>User Email</th>
		      <th>Date</th>
		      <th>Time</th>
		      <th>Approval Status</th>
		      <th>Cancelled?</th>
		      <th></th>
		      <th></th>
		      <th></th>
		    </tr>
		  </thead>
		  <tbody>
		  {this.state.bookings.map((booking, key) =>
		    <tr key={key}>
		      <td>{booking.email}</td>
		      <td>{booking.date}</td>
		      <td>{booking.time}</td>
		      <td>{booking.approved ? 'Approved' : 'Not Approved'}</td>
		      <td>{booking.cancelled ? 'Cancelled' : 'Not Cancelled'}</td>
		      <td>
		        <button className="w3-button w3-teal" onClick={this._approveBooking.bind(this, booking._id)}>Approve</button>
		      </td>
                      <td>
		        <button className="w3-button w3-teal" onClick={this._unapproveBooking.bind(this, booking._id)}>Un-Approve</button>
		      </td>
                      <td>
		        <button className="w3-button w3-teal" onClick={this._deleteBooking.bind(this, booking._id)}>Delete</button>
		      </td>
		    </tr>
		  )}
		  </tbody>
	        </table>
	        <p className="alert-msg">{this.state.bookingsMsg}</p>
	      </div>
	      <Weather />
	    </div>
	  )	
	} else {
	  return (
	    <div>
	      <div className="w3-container w3-indigo">
		<h1>Patient Booking System</h1>
		<Link to='/logout'>Logout</Link>
	      </div>	
	      <BookingForm getEmail={this._getEmail.bind(this)} updateBookings={this._updateBookings.bind(this)} />
	      <div className="w3-card-4 w3-margin">
	        <table className="w3-table-all">
	          <thead>
		    <tr className="w3-dark-grey">
		      <th>Date</th>
		      <th>Time</th>
		      <th>Approval Status</th>
		      <th>Cancelled?</th>
		      <th></th>
		    </tr>
		  </thead>
		  <tbody>
		  {this.state.bookings.map((booking, key) =>
		    <tr key={key}>
		      <td>{booking.date}</td>
		      <td>{booking.time}</td>
		      <td>{booking.approved ? 'Approved' : 'Not Approved'}</td>
		      <td>{booking.cancelled ? 'Cancelled' : 'Not Cancelled'}</td>
		      <td>
		        <button className="w3-button w3-teal" onClick={this._cancelBooking.bind(this, booking._id)}>Cancel</button>
		      </td>
		    </tr>
		  )}
		  </tbody>
	        </table>
	        <p className="alert-msg">{this.state.bookingsMsg}</p>
	      </div>
	      <Weather />
	    </div>
	  );
	}
  }
}

export default BookingPage;
