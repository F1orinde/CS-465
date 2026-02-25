var express = require('express');
var router = express.Router();

const ctrlTravel = require('../controllers/travlr');

/* GET travel page. */
router.get('/', ctrlTravel.travel);

module.exports = router;