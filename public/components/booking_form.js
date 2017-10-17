import React from 'react';
import axios from 'axios';

/**
 * React component for the booking form to submit data.
 * Contains 2 inputs for Date and Time that submits a
 * booking to the server. This sends it to the express
 * router which is accessable with the /book url
 */
class BookingForm extends React.Component {
  constructor() {
    super();
    this.state = {
      msg: "",
    };
  }

  render() {
	return (
	  <div className="w3-card-4 w3-margin">
		<div className="w3-container w3-dark-grey">
		  <h3>Make a Booking:</h3>
		</div>
		<form className="w3-container" onSubmit={this._submitBooking.bind(this)}>
		  <p><input className="w3-input w3-border w3-sand" type="date" ref={date => this.date = date} /></p>
		  <p><input className="w3-input w3-border w3-sand" type="time" ref={time => this.time = time} /></p>
		  <p><button className="w3-button w3-teal" type="submit">Book</button></p>
		  <p className="alert-msg">{this.state.msg}</p>
		</form>
	  </div>
	);
  }

  _submitBooking(event) {
	var self = this;
	event.preventDefault();

	axios.post('/book', {
	  date: this.date.value,
	  time: this.time.value,
	  approved: 'false',
	  email: this.props.email,
	}, {
	  headers: { Authorization: 'Bearer '.concat(localStorage.getItem('token')) },
	})
	.then((response) => {
	  this.setState({
	    msg: response.data
	  });
	  self.props.updateBookings();
	})

	.catch((error) => {
	  console.log(error);
	});
  }
}

export default BookingForm;
