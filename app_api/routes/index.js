const express = require('express');
const router = express.Router();

const ctrlTrips = require('../controllers/trips');

// =========================
// TRIPS ROUTES
// =========================

// GET all trips
router.route('/trips')
  .get(ctrlTrips.tripsList)
  .post(ctrlTrips.tripsAdd);     // ADD THIS

// GET one trip by code
// UPDATE a trip
// DELETE a trip
router.route('/trips/:tripCode')
  .get(ctrlTrips.tripsFindByCode)
  .put(ctrlTrips.tripsUpdateOne)     // ADD THIS
  .delete(ctrlTrips.tripsDeleteOne); // ADD THIS

module.exports = router;
