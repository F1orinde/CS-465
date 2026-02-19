const express = require('express');
const router = express.Router();

/*
 * OLD STATIC SITE ROUTES
 * These existed before Angular.
 * We now redirect them to Angular instead of serving .html files.
 */

router.get('/', function (req, res) {
  res.redirect('http://localhost:4200');
});

/*
 * Legacy pages that used to exist as HTML files
 * Redirect ALL of them to Angular app
 */

router.get('/dives.html', function (req, res) {
  res.redirect('http://localhost:4200');
});

router.get('/travel.html', function (req, res) {
  res.redirect('http://localhost:4200');
});

router.get('/rooms.html', function (req, res) {
  res.redirect('http://localhost:4200');
});

router.get('/meals.html', function (req, res) {
  res.redirect('http://localhost:4200');
});

router.get('/news.html', function (req, res) {
  res.redirect('http://localhost:4200');
});

router.get('/about.html', function (req, res) {
  res.redirect('http://localhost:4200');
});

router.get('/contact.html', function (req, res) {
  res.redirect('http://localhost:4200');
});

module.exports = router;
