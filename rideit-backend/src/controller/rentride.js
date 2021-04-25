import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import RentRide from '../model/rentride';
import Review3 from '../model/review3';
const verify = require('../middleware/authMiddleware')
export default({ config, db }) => {
  let api = Router();
  //CRUD Create Read Update Delete
  // '/v1/rentride/add
  api.post('/add',(req, res) => {
    let newRide = new RentRide();
    newRide.vehicleno= req.body.vehicleno;
    newRide.licenseno= req.body.licenseno;
    newRide.image= req.body.image;
    newRide.vehiclemodel=req.body.vehiclemodel;
    newRide.location.coordinates= req.body.location.coordinates;
    newRide.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Ride Added Sucessfully' });
    });
  });
// to get list of all rides
// v1/rentride
  api.get('/',verify,(req,res)=>{
    RentRide.find({},(err,Rides)=>{
      if(err){
        res.send(err);
      }
      res.json(Rides);
    });
  });

  // to get details about a particular ride
  //   v1/rentride/:id
  api.get('/:id',(req,res)=>{
    RentRide.findById(req.params.id,(err,Ride)=>{
      if(err){
        res.send(err);
      }
      res.json(Ride);
    });
  });


  api.put('/:id',(req,res)=>{
    RentRide.findById(req.params.id,(err,Ride)=>{
      if(err){
        res.send(err);
      }
      Ride.vehicleno= req.body.vehicleno;
      Ride.licenseno= req.body.licenseno;
      Ride.location.coordinates= req.body.location.coordinates;
      Ride.image=req.body.image;
      Ride.vehiclemodel= req.body.vehiclemodel;

      Ride.save(err=>{
        if(err){
          res.send(err);
        }
        res.json({message:"Rider info updated"});
      });
    });
  });

  //to delete rentride/:id
  api.delete('/:id',(req,res)=>{
    RentRide.remove({
      _id:req.params.id
    },(err,rentrider)=>{
      if(err){
        res.send(err);
      }
      res.json({messgae:"Ride Removed Sucessfully"});
    });

  });

  //v1/rentride/reviews/add/:id
  //route is to add ReviewSchema
  api.post('/reviews/add/:id',(req,res)=>{
    RentRide.findById(req.params.id,(err,Ride)=>{
      if(err){
        res.send(err);

      }
      let newReview= new Review3();
      newReview.title= req.body.title;
      newReview.text= req.body.text;
      newReview.rating= req.body.rating;
      newReview.rentride= Ride._id;
      newReview.save((err,review)=>{
        if(err){
          res.send(err);
        }
        Ride.reviews.push(newReview);
        Ride.save(err=>{
          if(err){
            res.send(err);
          }
          res.json({message:"Review Saved"});
        })
      });
    });
  });


  //get reviews of a a userid
  //v1/rentride/reviews/:id
    api.get('/reviews/:id',(req,res)=>{
      Review3.find({rentride:req.params.id},(err,reviews)=>{
        if(err){
          res.send(err);
        }
        res.json(reviews);
      });
    });

    api.delete('/reviews/:id',(req,res)=>{
      Review3.remove({_id:req.params.id},(err,share)=>{
        if(err){
          res.send(err);
        }
        res.json({messgae:"Review Deleted Susessfully"});
      });
    });








  return api;

}

//upload img
// upload images
const express = require('express');
const app = express();
const multer = require("multer");
const path = require("path");

// storage engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000000
    }
})
app.use('/profile', express.static('upload/images'));
app.post("/upload", upload.single('profile'), (req, res) => {

    res.json({
        success: 1,
        profile_url: `http://localhost:4000/profile/${req.file.filename}`
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
app.use(errHandler);
app.listen(4000, () => {
    console.log("server up and running");
})
