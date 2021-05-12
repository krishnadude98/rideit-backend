'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require('./review');

var _review2 = _interopRequireDefault(_review);

var _bidder = require('./bidder');

var _bidder2 = _interopRequireDefault(_bidder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var shareRideSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  date: Date,
  time: String,
  vehicleno: {
    type: String,
    required: true
  },
  vehiclemodel: String,
  eamount: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  bidders: [{ type: Schema.Types.ObjectId, ref: 'Bidder' }]
});

module.exports = _mongoose2.default.model('ShareRide', shareRideSchema);
//# sourceMappingURL=share.js.map