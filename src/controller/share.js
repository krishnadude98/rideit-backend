import mongoose from 'mongoose';
import { Router } from 'express';
import ShareRide from '../model/share';
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

  return api;
}
