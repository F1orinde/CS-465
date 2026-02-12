const mongoose = require('mongoose');

// Model name must match the name used in the schema file.
// In this project, the schema registers as: mongoose.model('Trip', tripSchema)
const Trip = mongoose.model('Trip');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    // Return a collection (even if empty) for consistency.
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

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

module.exports = {
  tripsList,
  tripsFindByCode,
};
