// Seed the MongoDB trips collection with data from data/trips.json
require('./db'); // connects to MongoDB and loads schemas

const mongoose = require('mongoose');
const Trip = mongoose.model('Trip');
const path = require('path');
const fs = require('fs');

const dataPath = path.join(__dirname, '..', '..', 'data', 'trips.json');

const raw = fs.readFileSync(dataPath, 'utf8');
const trips = JSON.parse(raw);

// Map JSON fields into the schema shape (keep safe defaults)
const mappedTrips = trips.map((t) => ({
  code: t.code,
  name: t.name,
  length: String(t.length),
  start: new Date(t.start),
  resort: t.resort,
  perPerson: Number(t.perPerson),
  image: t.image,
  description: t.description
}));

const run = async () => {
  try {
    await Trip.deleteMany({});
    await Trip.insertMany(mappedTrips);
    console.log(`Seeded ${mappedTrips.length} trips`);
  } catch (err) {
    console.error('Seeding error:', err);
  } finally {
    // Ensure the Node process exits cleanly so running "npm start" right after
    // in the same terminal works reliably.
    mongoose.connection.close(function () {
      process.exit(0);
    });
  }
};

run();
