const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  length: { type: String, required: true },
  start: { type: Date, required: true },
  resort: { type: String, required: true },
  perPerson: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true }
});

// Register model using a singular, capitalized name.
// MongoDB collection will still be "trips" via Mongoose pluralization.
mongoose.model('Trip', tripSchema);
