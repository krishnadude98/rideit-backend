'use strict';

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

var accountSchema = new Schema({
  email: {
    type: 'String',
    required: true,
    min: 6

  },

  password: {
    type: 'String',
    required: true,
    max: 1024,
    min: 6
  },
  name: {
    type: 'String',
    required: true,
    max: 255,
    min: 6
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = _mongoose2.default.model('Account', accountSchema);
//# sourceMappingURL=account.js.map