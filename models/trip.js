const mongoose = require('../db');

const tripSchema = new mongoose.Schema({
  code:String,
  name:String,
  length:String,
  start:String,
  resort:String,
  perPerson:Number,
  image:String,
  description:String
});

module.exports = mongoose.model('Trip',tripSchema);
