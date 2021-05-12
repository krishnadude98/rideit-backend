'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _share = require('./share');

var _share2 = _interopRequireDefault(_share);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var ReviewSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: String,
  shareride: {
    type: Schema.Types.ObjectId,
    ref: 'ShareRide',
    required: true
  }

});

module.exports = _mongoose2.default.model('Review', ReviewSchema);
//# sourceMappingURL=review.js.map