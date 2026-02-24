const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');

// =========================
// GET ALL TRIPS
// =========================
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// =========================
// GET ONE TRIP BY CODE
// =========================
const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  if (!tripCode) {
    return res.status(400).json({ message: 'tripCode is required' });
  }

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
};

// =========================
// ADD NEW TRIP
// =========================
const tripsAdd = async (req, res) => {
  try {
    const newTrip = await Trip.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    return res.status(201).json(newTrip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

// =========================
// UPDATE TRIP
// =========================
const tripsUpdateOne = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Trip.findOne({ code: tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    trip.code = req.body.code;
    trip.name = req.body.name;
    trip.length = req.body.length;
    trip.start = req.body.start;
    trip.resort = req.body.resort;
    trip.perPerson = req.body.perPerson;
    trip.image = req.body.image;
    trip.description = req.body.description;

    const updatedTrip = await trip.save();
    return res.status(200).json(updatedTrip);

  } catch (err) {
    return res.status(400).json(err);
  }
};

// =========================
// DELETE TRIP
// =========================
const tripsDeleteOne = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const result = await Trip.findOneAndDelete({ code: tripCode }).exec();

    if (!result) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    return res.status(204).json(null);

  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAdd,
  tripsUpdateOne,
  tripsDeleteOne
};
