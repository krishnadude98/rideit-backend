import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let shareRideSchema = new Schema({
  from:String,
  to:String,
  date:Date,
  time:String,
  vehicleno:String,
  vehiclemodel:String,
  eamount:String
});

module.exports = mongoose.model('ShareRide', shareRideSchema);
