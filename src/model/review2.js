import mongoose from 'mongoose';
import RentRider from './rentrider';

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
   rentrider:{
     type:Schema.Types.ObjectId,
     ref:'RentRider',
     required:true
   }



 });

 module.exports= mongoose.model('Review2',ReviewSchema);
