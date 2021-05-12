'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _share = require('./share');

var _share2 = _interopRequireDefault(_share);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;
var bidderSchema = new Schema({
  userid: {
    type: String,
    required: true
  },
  bid: Number,
  shareride: {
    type: Schema.Types.ObjectId,
    ref: 'ShareRide',
    required: true
  }
});
module.exports = _mongoose2.default.model('Bidder', bidderSchema);
//# sourceMappingURL=bidder.js.map