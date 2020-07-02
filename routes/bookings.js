const router = require('express').Router();
let Booking = require('../models/bookings.model');

router.route('/').get((req, res) => {
  Booking.find()
    .then(bookings => res.json(bookings))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const customername = req.body.customername;

  const newBooking = new Booking({
    customername
  });

  newBooking.save()
  .then(() => res.json('Boeking toegevoegd!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Booking.findById(req.params.id)
    .then(booking => res.json(booking))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Booking.findByIdAndDelete(req.params.id)
    .then(() => res.json('Booking deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Booking.findById(req.params.id)
    .then(booking => {
      booking.username = req.body.customername;
      booking.description = req.body.description;
      booking.duration = Number(req.body.duration);
      booking.date = Date.parse(req.body.date);

      booking.save()
        .then(() => res.json('Booking updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;