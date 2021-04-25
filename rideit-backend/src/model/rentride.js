import mongoose from 'mongoose';
import Review3 from './review3';
let Schema= mongoose.Schema;


let rentRideSchema= new Schema({
    licenseno:{
      type:String,
      required:true
    },
    vehicleno:{
      type:String,
      required:true
    },
    location:{
      type:{type:String,default:'Point'},
      coordinates:[Number]
    },
    image:String,
    vehiclemodel:String,
    reviews:[{type:Schema.Types.ObjectId,ref:'Review3'}]
});

module.exports= mongoose.model('RentRide',rentRideSchema);
