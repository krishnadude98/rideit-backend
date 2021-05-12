'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _express = require('express');

var _account = require('../model/account');

var _account2 = _interopRequireDefault(_account);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _authMiddleware = require('../middleware/authMiddleware');

var _authMiddleware2 = _interopRequireDefault(_authMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

exports.default = function (_ref) {
  var config = _ref.config,
      db = _ref.db;

  var api = (0, _express.Router)();

  // '/v1/account'
  api.get('/', function (req, res) {
    res.status(200).send({ user: req.user });
  });

  // '/v1/account/register'
  api.post('/register', function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var emailExist, salt, hash, account, savedUser;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _account2.default.findOne({ email: req.body.email });

            case 2:
              emailExist = _context.sent;

              if (!emailExist) {
                _context.next = 5;
                break;
              }

              return _context.abrupt('return', res.status(400).send("Email Already Exists"));

            case 5:

              //HASH password
              salt = bcrypt.genSaltSync(10);
              hash = bcrypt.hashSync(req.body.password, salt);
              account = new _account2.default({
                name: req.body.name,
                password: hash,
                email: req.body.email
              });


              try {
                savedUser = account.save();

                res.json({ message: "User Sucessfully Saved" });
              } catch (err) {
                res.status(400).send(err);
              }

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());

  api.post('/login', function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var user, validatePassword, token;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _account2.default.findOne({ email: req.body.email });

            case 2:
              user = _context2.sent;

              if (user) {
                _context2.next = 5;
                break;
              }

              return _context2.abrupt('return', res.status(400).send("Email is Wrong"));

            case 5:
              //check if password is correct
              validatePassword = bcrypt.compareSync(req.body.password, user.password);

              if (validatePassword) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt('return', res.status(400).send("Password is Wrong"));

            case 8:
              //create and assign tokken
              token = jwt.sign({ _id: user._id }, config.TokenSecret);

              res.header('auth-token', token).send(token);

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, undefined);
    }));

    return function (_x3, _x4) {
      return _ref3.apply(this, arguments);
    };
  }());

  return api;
};
//# sourceMappingURL=account.js.map