const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({}).exec();
    return res.status(200).json(trips);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const tripsFindByCode = async (req, res) => {
  if (!req.params || !req.params.tripCode) {
    return res.status(400).json({ message: 'tripCode parameter is required' });
  }

  try {
    const trip = await Trip.findOne({ code: req.params.tripCode }).exec();

    if (!trip) {
      return res.status(404).json({ message: 'tripCode not found' });
    }

    return res.status(200).json(trip);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const tripsAddTrip = async (req, res) => {
  // Support both naming styles:
  // New schema style: code, name, length, start, resort, perPerson, image, description
  // Older style (some versions): tripCode, tripName, tripLength, tripStart, tripResort, tripPerPerson, tripImage, tripDescription
  const data = {
    code: req.body.code ?? req.body.tripCode,
    name: req.body.name ?? req.body.tripName,
    length: req.body.length ?? req.body.tripLength,
    start: req.body.start ?? req.body.tripStart,
    resort: req.body.resort ?? req.body.tripResort,
    perPerson: req.body.perPerson ?? req.body.tripPerPerson,
    image: req.body.image ?? req.body.tripImage,
    description: req.body.description ?? req.body.tripDescription
  };

  try {
    const trip = await Trip.create(data);
    return res.status(201).json(trip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const tripsUpdateTrip = async (req, res) => {
  if (!req.params || !req.params.tripCode) {
    return res.status(400).json({ message: 'tripCode parameter is required' });
  }

  try {
    // Try both code styles for lookup
    let trip = await Trip.findOne({ code: req.params.tripCode }).exec();
    if (!trip) {
      trip = await Trip.findOne({ tripCode: req.params.tripCode }).exec();
    }

    if (!trip) {
      return res.status(404).json({ message: 'tripCode not found' });
    }

    // Update with either naming style
    if (req.body.code !== undefined || req.body.tripCode !== undefined) {
      trip.code = req.body.code ?? req.body.tripCode;
    }
    if (req.body.name !== undefined || req.body.tripName !== undefined) {
      trip.name = req.body.name ?? req.body.tripName;
    }
    if (req.body.length !== undefined || req.body.tripLength !== undefined) {
      trip.length = req.body.length ?? req.body.tripLength;
    }
    if (req.body.start !== undefined || req.body.tripStart !== undefined) {
      trip.start = req.body.start ?? req.body.tripStart;
    }
    if (req.body.resort !== undefined || req.body.tripResort !== undefined) {
      trip.resort = req.body.resort ?? req.body.tripResort;
    }
    if (req.body.perPerson !== undefined || req.body.tripPerPerson !== undefined) {
      trip.perPerson = req.body.perPerson ?? req.body.tripPerPerson;
    }
    if (req.body.image !== undefined || req.body.tripImage !== undefined) {
      trip.image = req.body.image ?? req.body.tripImage;
    }
    if (req.body.description !== undefined || req.body.tripDescription !== undefined) {
      trip.description = req.body.description ?? req.body.tripDescription;
    }

    const savedTrip = await trip.save();
    return res.status(200).json(savedTrip);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip
};