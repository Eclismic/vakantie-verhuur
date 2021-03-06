const express = require('express');
const { isEmpty } = require('lodash');
const User = require('../models/user');
const router = express.Router();

let Booking = require('../models/bookings.model');
let Customer = require('../models/customer.model');



router.post('user/add', async (req, res) => {
    if (isEmpty(req.body)) {
        return res.status(403).json({
            message: 'Body should not be empty',
            statusCode: 403
        });
    }
    const { name, position, company } = req.body;

    const newUser = new User({
        position,
        name,
        company,
        date: Date.now()
    });
    try {
        await newUser.save();
        res.json({
            message: 'Data successfully saved',
            statusCode: 200,
            name,
            position,
            company
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: 'Internal Server error',
            statusCode: 500
        });
    }
});


router.get('/users', async (req, res) => {

    try {
        const users = await User.find({});

        return res.json({
            users
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
       
});

router.get('/bookings', async (req,res) =>{
    Booking.find()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/bookings/add').post((req, res) => {
    const customername = req.body.customername;
    const startdateMonth = req.body.startdateMonth;
    const startdateDay = req.body.startdateDay;
    const enddateMonth = req.body.enddateMonth;
    const enddateDay = req.body.enddateDay;
    const allVacationDays = req.body.allVacationDays;
    const appartement = req.body.appartement;
  
    const newBooking = new Booking({customername, startdateMonth, startdateDay, enddateMonth, enddateDay, allVacationDays, appartement});
  
    newBooking.save()
      .then(() => res.json('Boeking toegevoegd!'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;