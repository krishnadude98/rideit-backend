import mongoose from 'mongoose';
import { Router } from 'express';
import bodyParser from 'body-parser';
import RentRider from '../model/rentrider';

export default({ config, db }) => {
  let api = Router();
  //CRUD Create Read Update Delete
  // '/v1/rentrider/add
  api.post('/add', (req, res) => {
    let newRider = new RentRider();
    newRider.userid= req.body.userid;
    newRider.licenseno= req.body.licenseno;
    newRider.rating= req.body.rating;
    newRider.imageid=req.body.imageid;
    newRider.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Rider Added Sucessfully' });
    });
  });
  return api;
}
