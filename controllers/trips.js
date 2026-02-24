const Trip=require('../models/trip');

exports.tripsList=async(req,res)=>res.json(await Trip.find());
exports.tripsAdd=async(req,res)=>res.status(201).json(await new Trip(req.body).save());
exports.tripsUpdate=async(req,res)=>res.json(await Trip.findByIdAndUpdate(req.params.tripId,req.body,{new:true}));
exports.tripsDelete=async(req,res)=>{await Trip.findByIdAndDelete(req.params.tripId);res.status(204).send();}
