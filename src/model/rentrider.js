import mongoose from 'mongoose';
import Review2 from './review2';
let Schema = mongoose.Schema;


let rentRiderSchema= new Schema({
  userid:{
    type:String,
    required:true,
  },
  licenseno:{
    type:String,
    required:true
  },
  lat:Number,
  long:Number,
  imageid:{
    type:String,
    required:true
  },
  contact:String,
  licensetype:String,
  reviews:[{type:Schema.Types.ObjectId,ref:'Review2'}]
});

module.exports= mongoose.model('RentRider',rentRiderSchema);
