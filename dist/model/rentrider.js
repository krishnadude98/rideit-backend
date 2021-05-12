'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _review = require('./review2');

var _review2 = _interopRequireDefault(_review);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var rentRiderSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  licenseno: {
    type: String,
    required: true
  },

  imageid: {
    type: String,
    required: true
  },
  reviews: [{ type: Schema.Types.ObjectId, ref: 'Review2' }]
});

module.exports = _mongoose2.default.model('RentRider', rentRiderSchema);
//# sourceMappingURL=rentrider.js.map