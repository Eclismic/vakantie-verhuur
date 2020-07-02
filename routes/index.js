const express = require('express');
const { isEmpty } = require('lodash');
const User = require('../models/user');
const router = express.Router();

const bookingsRouter = require('./bookings');
const customerRouter = require('./customer');

app.use('/bookings', bookingsRouter);
app.use('/customer', customerRouter);

module.exports = router;