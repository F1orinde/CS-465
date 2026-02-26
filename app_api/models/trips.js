const mongoose = require('mongoose');
const Model = mongoose.model('trips');

const tripsList = async (req, res) => {
  try {
    const trips = await Model.find();
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json(err);
  }
};

const tripsAddTrip = async (req, res) => {
  try {
    const newTrip = await Model.create({
      code: req.body.code,
      name: req.body.name,
      length: req.body.length,
      start: req.body.start,
      resort: req.body.resort,
      perPerson: req.body.perPerson,
      image: req.body.image,
      description: req.body.description
    });

    res.status(201).json(newTrip);
  } catch (err) {
    res.status(400).json(err);
  }
};

// PUT: /trips/:tripCode - Updates a Trip
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const tripsUpdateTrip = async (req, res) => {
  // Uncomment for debugging
  // console.log(req.params);
  // console.log(req.body);

  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      },
      { new: true }
    ).exec();

    if (!q) {
      return res.status(400).json({ message: 'Database returned no data' });
    } else {
      return res.status(201).json(q);
    }

    // Uncomment to see results of operation
    // console.log(q);
  } catch (err) {
    return res.status(400).json(err);
  }
};

module.exports = {
  tripsList,
  tripsAddTrip,
  tripsUpdateTrip
};