const mongoose = require('mongoose');
var configDB = require('../config/database.js');
var User = require('../models/user');
var Booking = require('../models/booking');

mongoose.connect(configDB.url, {
  useMongoClient: true,
});

function makeBooking(booking, callback) {
  var newBooking = new Booking();
  newBooking.date = booking.date;
  newBooking.time = booking.time;
  newBooking.approved = false;
  newBooking.cancelled = false;
  newBooking.email = booking.email;
  newBooking.save((error) => {
    if (error) {
      callback('An error occured');
    } else {
      callback('Booking saved!');
    }
  })
}

function getBookings(email, callback) {
  Booking.find({email: email}, (err, bookings) => {
    if (bookings.length < 1) {
      callback([{time: 'No bookings found'}])
    } else {
      callback(bookings);
    }
  });
}

function cancelBooking(email, bookingId, callback) {
  Booking.findOne({_id: bookingId} , (err, booking) => {
    if (!booking) {
      callback('Error: booking not found');
    } else if (booking.email !== email) {
      callback('Error: you do not own this booking');
    } else {
      booking.cancelled = true;
      booking.save((error) => {
        if (error) {
	  callback('An error occured');
	} else {
          callback('Booking cancelled');
	}
      });
    }
  });
}

function adminMakeBooking(booking, callback) {
  console.log(booking);
  User.findOne({'local.username': booking.adminEmail}, (err, adminUser) => {
    if (!adminUser) {
      callback('Error: admin user not found');
    } else if (!adminUser.local.admin) {
      callback('Error: only admins can access this resource');
    } else {
      User.findOne({'local.username': booking.email}, (err, user) => {
        if (!user) {
	  callback('Error: user not found');
	} else {
	  var newBooking = new Booking();
          newBooking.date = booking.date;
          newBooking.time = booking.time;
          newBooking.approved = true;
          newBooking.cancelled = false;
          newBooking.email = booking.email;
          newBooking.save((error) => {
            if (error) {
              callback('An error occured');
            } else {
              callback('Booking saved!');
            }
          })
	}
      });  
    }
  });
}

function adminGetBookings(email, callback) {
  User.findOne({email: email}, (err, user) => {
    if (!user) {
      callback('Error: user not found');
    } else if (!user.local.admin) {
      callback('Error: only admins can access this resource');
    } else {
      Booking.find({}, (err, bookings) => {
        callback(bookings);
      });
    }
  });
}

function adminSearchUser(email, callback) {
 console.log();
}

function approveBooking(email, callback) {
 console.log();
}

function unapproveBooking(email, callback) {
 console.log();
}

function deleteBooking(email, callback) {
 console.log();
}

module.exports = {
  makeBooking: makeBooking,
  getBookings: getBookings,
  cancelBooking: cancelBooking,
  adminMakeBooking: adminMakeBooking,
  adminGetBookings: adminGetBookings,
  adminSearchUser: adminSearchUser,
  approveBooking: approveBooking,
  unapproveBooking: unapproveBooking,
  deleteBooking: deleteBooking,
}
