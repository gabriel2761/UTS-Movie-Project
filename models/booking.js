var mongoose = require('mongoose');

var bookingSchema = mongoose.Schema({
  date: String,
  time: String,
  approved: Boolean,
  cancelled: Boolean,
  email: String,
});

module.exports = mongoose.model('Booking', bookingSchema);
