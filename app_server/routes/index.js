/*
 * Routes for the Travlr customer-facing site
 */
const express = require('express');
const router = express.Router();

const ctrlTravlr = require('../controllers/travlr');

// Home
router.get('/', ctrlTravlr.home);

// Travel (dynamic from JSON)
router.get('/travel', ctrlTravlr.travel);

// Placeholder routes for remaining nav items (templated later in the course)
router.get('/rooms', (req, res) => res.render('page', { title: 'Travlr Getaways', pageTitle: 'Rooms' }));
router.get('/meals', (req, res) => res.render('page', { title: 'Travlr Getaways', pageTitle: 'Meals' }));
router.get('/news', (req, res) => res.render('page', { title: 'Travlr Getaways', pageTitle: 'News' }));
router.get('/about', (req, res) => res.render('page', { title: 'Travlr Getaways', pageTitle: 'About' }));
router.get('/contact', (req, res) => res.render('page', { title: 'Travlr Getaways', pageTitle: 'Contact' }));

module.exports = router;
