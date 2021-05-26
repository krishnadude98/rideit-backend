import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import RentRider from '../model/rentrider';
import Review2 from '../model/review2';
const verify = require('../middleware/authMiddleware');
import multer from 'multer';
const storage= multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,'uploads/');
  },
  filename:function(req,file,cb){
    var random=Math.floor(Math.random()*1000)

    cb(null,random+file.originalname);
  }
});
const fileFilter =(req,file,cb)=>{
  if(file.mimetype==='image/jpeg'||file.mimetype==='image/png'){
    cb(null,true);
  }
  else{
    cb(null,false);
  }
};

const upload= multer({storage:storage,limits:{
  fileSize:1024*1024*10
},
fileFilter:fileFilter
});

export default({ config, db }) => {
  let api = Router();
  //CRUD Create Read Update Delete
  // '/v1/rentrider/add
  api.post('/add',verify,upload.single('riderimg'), (req, res) => {
    console.log(req.file);
    let newRider = new RentRider();
    newRider.userid= req.body.userid;
    newRider.licenseno= req.body.licenseno;
    newRider.licensetype = req.body.licensetype;
    newRider.imageid=req.file.path;
    newRider.lat=req.body.lat;
    newRider.long=req.body.long;
    newRider.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Rider Added Sucessfully' });
    });
  });
  //v1/rentrider
  api.get('/',(req,res)=>{
    RentRider.find({},(err,Riders)=>{
      if(err){
        res.send(err);
      }
      res.json(Riders);
    });
  });
  // v1/rentrider/:id --Read 1
  api.get('/:id',(req,res)=>{
    RentRider.findById(req.params.id,(err,Rider)=>{
      if(err){
        res.send(err);
      }
      res.json(Rider);
    });
  });

  //update a rider v1/rentrider/:id
  api.put('/:id',verify,(req,res)=>{
    RentRider.findById(req.params.id,(err,Rider)=>{
      if(err){
        res.send(err);
      }
      Rider.userid= req.body.userid;
      Rider.licenseno= req.body.licenseno;
      Rider.rating= req.body.rating;
      Rider.imageid=req.body.imageid;

      Rider.save(err=>{
        if(err){
          res.send(err);
        }
        res.json({message:"Rider info updated"});
      });
    });
  });

  //delete a rider v1/rentrider/:id
  api.delete('/:id',verify,(req,res)=>{
    RentRider.remove({
      _id:req.params.id
    },(err,rentrider)=>{
      if(err){
        res.send(err);
      }
      res.json({messgae:"Rider Removed Sucessfully"});
    });

  });

  //v1/rentrider/reviews/add/:id
  //route is to add ReviewSchema
  api.post('/reviews/add/:id',verify,(req,res)=>{
    RentRider.findById(req.params.id,(err,Rider)=>{
      if(err){
        res.send(err);

      }
      let newReview= new Review2();
      newReview.title= req.body.title;
      newReview.text= req.body.text;
      newReview.rating= req.body.rating;
      newReview.rentrider= Rider._id;
      newReview.save((err,review)=>{
        if(err){
          res.send(err);
        }
        Rider.reviews.concat(newReview);
        Rider.save(err=>{
          if(err){
            res.send(err);
          }
          res.json({message:"Review Saved"});
        })
      });
    });
  });

//get reviews of a a userid
//v1/rentrider/reviews/:id
  api.get('/reviews/:id',(req,res)=>{
    Review2.find({rentrider:req.params.id},(err,reviews)=>{
      if(err){
        res.send(err);
      }
      res.json(reviews);
    });
  });

//delete a Review
api.delete('/reviews/:id',verify,(req,res)=>{
  Review2.remove({_id:req.params.id},(err,share)=>{
    if(err){
      res.send(err);
    }
    res.json({messgae:"Review Deleted Sucessfully"});
  });
});



  return api;
}
