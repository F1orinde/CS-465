const express = require('express');
const router = express.Router();

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');
const jwt = require('../config/jwt');

// Auth endpoints
router.route('/register').post(authController.register);
router.route('/login').post(authController.login);

// Trip endpoints (public read)
router.route('/trips').get(tripsController.tripsList);
router.route('/trips/:tripCode').get(tripsController.tripsFindByCode);

// Trip endpoints (protected write)
router.route('/trips').post(jwt.auth, tripsController.tripsAddTrip);
router.route('/trips/:tripCode').put(jwt.auth, tripsController.tripsUpdateTrip);

module.exports = router;