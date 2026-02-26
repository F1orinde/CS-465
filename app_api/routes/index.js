const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');

// define routes for our trips endpoint
router
  .route('/trips')
  .get(tripsController.tripsList)
  .post(tripsController.tripsAddTrip);

router
  .route('/trips/:tripCode')
  .put(tripsController.tripsUpdateTrip);

module.exports = router;