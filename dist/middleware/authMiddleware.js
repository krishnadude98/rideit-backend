'use strict';

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var jwt = require('jsonwebtoken');


module.exports = function (req, res, next) {
  var token = req.header('auth-token');
  if (!token) {
    return res.status(401).json({ message: "Access Denied" });
  }
  try {
    var verified = jwt.verify(token, _config2.default.TokenSecret);
    req.user = verified; //verified is id
    next();
  } catch (e) {
    res.status(400).json({ message: "Invalid Token" });
  }
};
//# sourceMappingURL=authMiddleware.js.map