import mongoose from 'mongoose';
import ShareRide from './share';

 let Schema= mongoose.Schema;
 let bidderSchema= new Schema({
    userid:{
      type:String,
      required:true
    },
    bid:Number,
    name:String,
    shareride:{
      type:Schema.Types.ObjectId,
      ref:'ShareRide',
      required:true
    }
 });
 module.exports= mongoose.model('Bidder',bidderSchema);
