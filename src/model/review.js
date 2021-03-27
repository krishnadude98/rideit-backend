import mongoose from 'mongoose';
import ShareRide from './share';

 let Schema= mongoose.Schema;

 let ReviewSchema= new Schema({
   title:{
     type:String,
     required:true
   },
   text:String,
   shareride:{
     type:Schema.Types.ObjectId,
     ref:'ShareRide',
     required:true
   }


 });

 module.exports= mongoose.model('Review',ReviewSchema);
