const express = require('express');
const router = express.Router();

const ctrlTravlr = require('../controllers/travlr');

router.get('/', ctrlTravlr.home);

module.exports = router;
