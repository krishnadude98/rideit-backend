import mongoose from 'mongoose';
import { Router } from 'express';
import ShareRide from '../model/share';
import Review from '../model/review';
import Bidder from '../model/bidder';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();
  //CRUD Create Read Update Delete
  // '/v1/restaurant/add'
  api.post('/add', (req, res) => {
    let newRide = new ShareRide();
    newRide.from = req.body.from;
    newRide.to = req.body.to;
    newRide.date = req.body.date;
    newRide.time = req.body.time;
    newRide.vehicleno = req.body.vehicleno;
    newRide.vehiclemodel = req.body.vehiclemodel;
    newRide.eamount = req.body.eamount;

    newRide.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Advertisement added sucessfuly' });
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
    api.delete('/:id',(req,res)=>{
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
     api.post('/reviews/add/:id',(req,res)=>{
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
            advertisement.reviews.push(newReview);
            advertisement.save(err=>{
              if(err){
                res.send(err);

              }
              res.json({message:"Review Saved"});
            });
          });
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

      //add bidders for particular ad /bidders/added
      api.post('/bidders/add/:id',(req,res)=>{
        ShareRide.findById(req.params.id,(err,advertisement)=>{
          if(err){
            res.send(err);
          }
          let newBidder= new Bidder();
          newBidder.userid= req.body.userid;
          newBidder.bid= req.body.bid;
          newBidder.shareride=advertisement._id;
          newBidder.save((err,bidder)=>{
            if(err){
              res.send(err);
            }
            advertisement.bidders.push(newBidder);
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
