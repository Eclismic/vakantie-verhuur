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
    console.log("ga je hier in?1");
    const customername = req.body.customername;
  
    const newCustomer = new Customer({customername});
  
    newCustomer.save()
      .then(() => res.json('Klant toegevoegd!'))
      .catch(err => res.status(400).json('[FOUT!!!!!]Error: ' + err));
  });

module.exports = router;