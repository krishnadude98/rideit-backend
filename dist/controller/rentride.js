'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _rentride = require('../model/rentride');

var _rentride2 = _interopRequireDefault(_rentride);

var _review = require('../model/review3');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verify = require('../middleware/authMiddleware');

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();
  //CRUD Create Read Update Delete
  // '/v1/rentride/add
  api.post('/add', function (req, res) {
    var newRide = new _rentride2.default();
    newRide.vehicleno = req.body.vehicleno;
    newRide.licenseno = req.body.licenseno;
    newRide.image = req.body.image;
    newRide.vehiclemodel = req.body.vehiclemodel;
    newRide.location.coordinates = req.body.location.coordinates;
    newRide.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Ride Added Sucessfully' });
    });
  });
  // to get list of all rides
  // v1/rentride
  api.get('/', verify, function (req, res) {
    _rentride2.default.find({}, function (err, Rides) {
      if (err) {
        res.send(err);
      }
      res.json(Rides);
    });
  });

  // to get details about a particular ride
  //   v1/rentride/:id
  api.get('/:id', function (req, res) {
    _rentride2.default.findById(req.params.id, function (err, Ride) {
      if (err) {
        res.send(err);
      }
      res.json(Ride);
    });
  });

  api.put('/:id', function (req, res) {
    _rentride2.default.findById(req.params.id, function (err, Ride) {
      if (err) {
        res.send(err);
      }
      Ride.vehicleno = req.body.vehicleno;
      Ride.licenseno = req.body.licenseno;
      Ride.location.coordinates = req.body.location.coordinates;
      Ride.image = req.body.image;
      Ride.vehiclemodel = req.body.vehiclemodel;

      Ride.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Rider info updated" });
      });
    });
  });

  //to delete rentride/:id
  api.delete('/:id', function (req, res) {
    _rentride2.default.remove({
      _id: req.params.id
    }, function (err, rentrider) {
      if (err) {
        res.send(err);
      }
      res.json({ messgae: "Ride Removed Sucessfully" });
    });
  });

  //v1/rentride/reviews/add/:id
  //route is to add ReviewSchema
  api.post('/reviews/add/:id', function (req, res) {
    _rentride2.default.findById(req.params.id, function (err, Ride) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.rating = req.body.rating;
      newReview.rentride = Ride._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        Ride.reviews.push(newReview);
        Ride.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: "Review Saved" });
        });
      });
    });
  });

  //get reviews of a a userid
  //v1/rentride/reviews/:id
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ rentride: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  api.delete('/reviews/:id', function (req, res) {
    _review2.default.remove({ _id: req.params.id }, function (err, share) {
      if (err) {
        res.send(err);
      }
      res.json({ messgae: "Review Deleted Susessfully" });
    });
  });

  return api;
};
//# sourceMappingURL=rentride.js.map