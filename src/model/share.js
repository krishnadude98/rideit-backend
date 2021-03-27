import mongoose from 'mongoose';
import Review from './review'
let Schema = mongoose.Schema;

let shareRideSchema = new Schema({
  from:{
    type:String,
    required:true
  },
  to:{
    type:String,
    required:true
  },
  date:Date,
  time:String,
  vehicleno:{
    type:String,
    required:true
  },
  vehiclemodel:String,
  eamount:String,
  reviews:[{type:Schema.Types.ObjectId,ref:'Review'}]
});

module.exports = mongoose.model('ShareRide', shareRideSchema);
