'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptAsPromised = require('bcrypt-as-promised');

var _bcryptAsPromised2 = _interopRequireDefault(_bcryptAsPromised);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Schema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    hidden: true
  },
  email: {
    type: String,
    required: false,
    index: true
  },
  active: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'users'
});

Schema.pre('save', function (next) {
  var _this = this;

  // Hash the password
  if (this.isModified('password')) {
    this.encryptPassword(this.password).then(function (hash) {
      _this.password = hash;
      next();
    }).catch(function (err) {
      return next(err);
    });
  } else {
    return next();
  }
});

Schema.methods = {
  authenticate: function authenticate(plainTextPassword) {
    var _this2 = this;

    return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return _bcryptAsPromised2.default.compare(plainTextPassword, _this2.password);

            case 3:
              return _context.abrupt('return', _context.sent);

            case 6:
              _context.prev = 6;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', false);

            case 9:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 6]]);
    }))();
  },
  encryptPassword: function encryptPassword(password) {
    return _bcryptAsPromised2.default.hash(password, 8);
  }
};

exports.default = _mongoose2.default.model('User', Schema);