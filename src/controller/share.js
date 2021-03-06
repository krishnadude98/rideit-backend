import mongoose from 'mongoose';
import { Router } from 'express';
import ShareRide from '../model/share';
import Review from '../model/review';
import Bidder from '../model/bidder';

import bodyParser from 'body-parser';
const verify = require('../middleware/authMiddleware')
export default({ config, db }) => {
  let api = Router();
  //CRUD Create Read Update Delete
  // '/v1/restaurant/add'
  api.post('/add',verify, (req, res) => {
    let newRide = new ShareRide();
    newRide.from = req.body.from;
    newRide.to = req.body.to;
    newRide.date = req.body.date;
    newRide.time = req.body.time;
    newRide.vehicleno = req.body.vehicleno;
    newRide.vehiclemodel = req.body.vehiclemodel;
    newRide.eamount = req.body.eamount;
    newRide.accountid = req.body.accountid;
    newRide.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Advertisement added sucessfully' });
    });
  });
  //v1/share --Read
  api.get('/',(req,res)=>{
    ShareRide.find({},(err,shareRides)=>{
      if(err){
        res.send(err);
      }
      res.json(shareRides);
    });
  });

  // v1/share/:id --Read 1
  api.get('/:id',(req,res)=>{
    ShareRide.findById(req.params.id,(err,shareRide)=>{
      if(err){
        res.send(err);
      }
      res.json(shareRide);
    });
  });
  // v1/share/:id --Update
  api.put('/:id',(req,res)=>{
    ShareRide.findById(req.params.id,(err,shareRide)=>{
      if(err){
        res.send(err);
      }
      shareRide.from= req.body.from;
      shareRide.to= req.body.to;
      shareRide.date = req.body.date;
      shareRide.time = req.body.time;
      shareRide.vehicleno = req.body.vehicleno;
      shareRide.vehiclemodel = req.body.vehiclemodel;
      shareRide.eamount = req.body.eamount;


      shareRide.save(err=>{
        if(err){
          res.send(err);
        }
        res.json({message:"Advertisement info updated"});
      });
    });
  });

  //v1/share/:// IDEA:
    api.delete('/:id',verify,(req,res)=>{
      ShareRide.remove({
        _id:req.params.id
      },(err,share)=>{
        if(err){
          res.send(err);
        }
        res.json({messgae:"Advertisement sucessfully removed"});
      });

    });
    //add review for particular Advertisement
    //v1/reviews/add/:id is the path
     api.post('/reviews/add/:id',verify,(req,res)=>{
        ShareRide.findById(req.params.id,(err,advertisement)=>{
          if(err){
            res.send(err);
          }
          let newReview= new Review();
          newReview.title= req.body.title;
          newReview.text= req.body.text;
          newReview.shareride= advertisement._id;
          newReview.save((err,review)=>{
            if(err){
              res.send(err);
            }
            advertisement.reviews.concat(newReview);
            advertisement.save(err=>{
              if(err){
                res.send(err);

              }
              res.json({message:"Review Saved"});
            });
          });
        });
     });
     api.get('/account/:id',(req,res)=>{
       ShareRide.find({accountid:req.params.id},(err,shareride)=>{
         if(err){
           res.send(err);
         }
         res.json(shareride);
       });
     });
     //get reviews for a particular /reviews/:id:
      api.get('/reviews/:id',(req,res)=>{
        Review.find({shareride:req.params.id},(err,reviews)=>{
          if(err){
            res.send(err);
          }
          res.json(reviews);
        });
      });
      api.get('/bidders/:id',(req,res)=>{
        Bidder.find({shareride:req.params.id},(err,bidders)=>{
          if(err){
            res.send(err);
          }
          res.json(bidders);
        });
      });


      //add bidders for particular ad /bidders/added
      api.post('/bidders/add/:id',verify,(req,res)=>{
        ShareRide.findById(req.params.id,(err,advertisement)=>{
          if(err){
            res.send(err);
          }
          let newBidder= new Bidder();
          newBidder.userid= req.body.userid;
          newBidder.bid= req.body.bid;
          newBidder.name=req.body.name;
          newBidder.shareride=advertisement._id;
          newBidder.save((err,bidder)=>{
            if(err){
              res.send(err);
            }
            advertisement.bidders.concat(newBidder);
            advertisement.save(err=>{
              if(err){
                res.send(err);
              }
              res.json({message:"Bidder added Sucessfully"})
            });
          });

        });
      });


  return api;
}
