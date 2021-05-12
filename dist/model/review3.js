'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _rentride = require('./rentride');

var _rentride2 = _interopRequireDefault(_rentride);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true
  },
  rentride: {
    type: Schema.Types.ObjectId,
    ref: 'RentRide',
    required: true
  }

});

module.exports = _mongoose2.default.model('Review3', ReviewSchema);
//# sourceMappingURL=review3.js.map