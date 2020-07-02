const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema({
  customername: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
}, {
  timestamps: true,
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;