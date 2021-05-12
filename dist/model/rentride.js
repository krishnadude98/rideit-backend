'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require('./review3');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var rentRideSchema = new Schema({
  licenseno: {
    type: String,
    required: true
  },
  vehicleno: {
    type: String,
    required: true
  },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]
  },
  image: String,
  vehiclemodel: String,
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review3' }]
});

module.exports = _mongoose2.default.model('RentRide', rentRideSchema);
//# sourceMappingURL=rentride.js.map