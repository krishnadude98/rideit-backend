import mongoose from 'mongoose';
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
  rating:{
    type:Number,
    min:0,
    max:10,
    required:true
  },
  imageid:{
    type:String,
    required:true
  }
});

module.exports= mongoose.model('RentRider',rentRiderSchema);
