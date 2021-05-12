'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _rentrider = require('../model/rentrider');

var _rentrider2 = _interopRequireDefault(_rentrider);

var _review = require('../model/review2');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();
  //CRUD Create Read Update Delete
  // '/v1/rentrider/add
  api.post('/add', function (req, res) {
    var newRider = new _rentrider2.default();
    newRider.userid = req.body.userid;
    newRider.licenseno = req.body.licenseno;
    newRider.rating = req.body.rating;
    newRider.imageid = req.body.imageid;
    newRider.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Rider Added Sucessfully' });
    });
  });
  //v1/rentrider
  api.get('/', function (req, res) {
    _rentrider2.default.find({}, function (err, Riders) {
      if (err) {
        res.send(err);
      }
      res.json(Riders);
    });
  });
  // v1/rentrider/:id --Read 1
  api.get('/:id', function (req, res) {
    _rentrider2.default.findById(req.params.id, function (err, Rider) {
      if (err) {
        res.send(err);
      }
      res.json(Rider);
    });
  });

  //update a rider v1/rentrider/:id
  api.put('/:id', function (req, res) {
    _rentrider2.default.findById(req.params.id, function (err, Rider) {
      if (err) {
        res.send(err);
      }
      Rider.userid = req.body.userid;
      Rider.licenseno = req.body.licenseno;
      Rider.rating = req.body.rating;
      Rider.imageid = req.body.imageid;

      Rider.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Rider info updated" });
      });
    });
  });

  //delete a rider v1/rentrider/:id
  api.delete('/:id', function (req, res) {
    _rentrider2.default.remove({
      _id: req.params.id
    }, function (err, rentrider) {
      if (err) {
        res.send(err);
      }
      res.json({ messgae: "Rider Removed Sucessfully" });
    });
  });

  //v1/rentrider/reviews/add/:id
  //route is to add ReviewSchema
  api.post('/reviews/add/:id', function (req, res) {
    _rentrider2.default.findById(req.params.id, function (err, Rider) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.rating = req.body.rating;
      newReview.rentrider = Rider._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        Rider.reviews.push(newReview);
        Rider.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: "Review Saved" });
        });
      });
    });
  });

  //get reviews of a a userid
  //v1/rentrider/reviews/:id
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ rentrider: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  //delete a Review
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
//# sourceMappingURL=rentrider.js.map