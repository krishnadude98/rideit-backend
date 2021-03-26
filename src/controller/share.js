import mongoose from 'mongoose';
import { Router } from 'express';
import ShareRide from '../model/share';
import bodyParser from 'body-parser';

export default({ config, db }) => {
  let api = Router();

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
  return api;
}
