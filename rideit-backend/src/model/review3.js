import mongoose from 'mongoose';
import RentRide from './rentride';

 let Schema= mongoose.Schema;

 let ReviewSchema= new Schema({
   title:{
     type:String,
     required:true
   },
   text:String,
   rating:{
     type:Number,
     min:0,
     max:10,
     required:true
   },
   rentride:{
     type:Schema.Types.ObjectId,
     ref:'RentRide',
     required:true
   }



 });

 module.exports= mongoose.model('Review3',ReviewSchema);
