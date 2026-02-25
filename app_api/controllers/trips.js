const mongoose = require('mongoose');
const Trip = require('../models/travlr');

// GET /api/trips - lists all the trips
const tripsList = async (req, res) => {
  const q = await Trip
    .find({})
    .exec();

  if (!q) {
    return res
      .status(404)
      .json(err);
  } else {
    return res
      .status(200)
      .json(q);
  }
};
const tripsFindByCode = async (req, res) => {
  const q = await Trip
    .find({ 'code': req.params.tripCode })
    .exec();

  if (!q) {
    return res
      .status(404)
      .json(err);
  } else {
    return res
      .status(200)
      .json(q);
  }
};
module.exports = {
  tripsList,
  tripsFindByCode
};