import React from 'react';
/**
 * React component for the booking form to submit data.
 * Contains 2 inputs for Date and Time that submits a
 * booking to the server. This sends it to the express
 * router which is accessable with the /book url
 */
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
	  time: this.time.value,
	  approved: 'false',
	})

	.then((response) => {
	  self.props.updateBookings();
	})

	.catch((error) => {
	  console.log(error);
	});
  }
}

export default BookingForm;
