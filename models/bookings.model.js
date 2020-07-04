const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  customername: { type: String, required: true },
  startdateMonth:{type: Number},
  startdateDay:{type: Number},
  enddateMonth:{type:Number},
  enddateDay:{type:Number},
  allVacationDays:{type: Array}
},{
  timestamps: true,
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;