'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _rentrider = require('./rentrider');

var _rentrider2 = _interopRequireDefault(_rentrider);

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
  rentrider: {
    type: Schema.Types.ObjectId,
    ref: 'RentRider',
    required: true
  }

});

module.exports = _mongoose2.default.model('Review2', ReviewSchema);
//# sourceMappingURL=review2.js.map