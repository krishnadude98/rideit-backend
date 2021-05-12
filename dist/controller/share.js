'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _share = require('../model/share');

var _share2 = _interopRequireDefault(_share);

var _review = require('../model/review');

var _review2 = _interopRequireDefault(_review);

var _bidder = require('../model/bidder');

var _bidder2 = _interopRequireDefault(_bidder);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();
  //CRUD Create Read Update Delete
  // '/v1/restaurant/add'
  api.post('/add', function (req, res) {
    var newRide = new _share2.default();
    newRide.from = req.body.from;
    newRide.to = req.body.to;
    newRide.date = req.body.date;
    newRide.time = req.body.time;
    newRide.vehicleno = req.body.vehicleno;
    newRide.vehiclemodel = req.body.vehiclemodel;
    newRide.eamount = req.body.eamount;

    newRide.save(function (err) {
      if (err) {
        res.send(err);
      }
      res.json({ message: 'Advertisement added sucessfuly' });
    });
  });
  //v1/share --Read
  api.get('/', function (req, res) {
    _share2.default.find({}, function (err, shareRides) {
      if (err) {
        res.send(err);
      }
      res.json(shareRides);
    });
  });

  // v1/share/:id --Read 1
  api.get('/:id', function (req, res) {
    _share2.default.findById(req.params.id, function (err, shareRide) {
      if (err) {
        res.send(err);
      }
      res.json(shareRide);
    });
  });
  // v1/share/:id --Update
  api.put('/:id', function (req, res) {
    _share2.default.findById(req.params.id, function (err, shareRide) {
      if (err) {
        res.send(err);
      }
      shareRide.from = req.body.from;
      shareRide.to = req.body.to;
      shareRide.date = req.body.date;
      shareRide.time = req.body.time;
      shareRide.vehicleno = req.body.vehicleno;
      shareRide.vehiclemodel = req.body.vehiclemodel;
      shareRide.eamount = req.body.eamount;

      shareRide.save(function (err) {
        if (err) {
          res.send(err);
        }
        res.json({ message: "Advertisement info updated" });
      });
    });
  });

  //v1/share/:// IDEA:
  api.delete('/:id', function (req, res) {
    _share2.default.remove({
      _id: req.params.id
    }, function (err, share) {
      if (err) {
        res.send(err);
      }
      res.json({ messgae: "Advertisement sucessfully removed" });
    });
  });
  //add review for particular Advertisement
  //v1/reviews/add/:id is the path
  api.post('/reviews/add/:id', function (req, res) {
    _share2.default.findById(req.params.id, function (err, advertisement) {
      if (err) {
        res.send(err);
      }
      var newReview = new _review2.default();
      newReview.title = req.body.title;
      newReview.text = req.body.text;
      newReview.shareride = advertisement._id;
      newReview.save(function (err, review) {
        if (err) {
          res.send(err);
        }
        advertisement.reviews.push(newReview);
        advertisement.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: "Review Saved" });
        });
      });
    });
  });
  //get reviews for a particular /reviews/:id:
  api.get('/reviews/:id', function (req, res) {
    _review2.default.find({ shareride: req.params.id }, function (err, reviews) {
      if (err) {
        res.send(err);
      }
      res.json(reviews);
    });
  });

  //add bidders for particular ad /bidders/added
  api.post('/bidders/add/:id', function (req, res) {
    _share2.default.findById(req.params.id, function (err, advertisement) {
      if (err) {
        res.send(err);
      }
      var newBidder = new _bidder2.default();
      newBidder.userid = req.body.userid;
      newBidder.bid = req.body.bid;
      newBidder.shareride = advertisement._id;
      newBidder.save(function (err, bidder) {
        if (err) {
          res.send(err);
        }
        advertisement.bidders.push(newBidder);
        advertisement.save(function (err) {
          if (err) {
            res.send(err);
          }
          res.json({ message: "Bidder added Sucessfully" });
        });
      });
    });
  });

  return api;
};
//# sourceMappingURL=share.js.map