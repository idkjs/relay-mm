'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _model = require('../model');

var _ConnectionFromMongoCursor = require('../connection/ConnectionFromMongoCursor');

var _ConnectionFromMongoCursor2 = _interopRequireDefault(_ConnectionFromMongoCursor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User(data, viewer) {
    _classCallCheck(this, User);

    this.id = data.id;
    this._id = data._id;
    this.name = data.name;

    // you can only see your own email, and your active status
    if (viewer && viewer._id.equals(data._id)) {
      this.email = data.email;
      this.active = data.active;
    }
  }

  _createClass(User, null, [{
    key: 'viewerCanSee',
    value: function viewerCanSee(viewer, data) {
      // Anyone can se another user
      return true;
    }
  }, {
    key: 'load',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(_ref2, id) {
        var viewer = _ref2.user,
            dataloaders = _ref2.dataloaders;
        var data;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (id) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt('return', null);

              case 2:
                _context.next = 4;
                return dataloaders.UserLoader.load(id);

              case 4:
                data = _context.sent;

                if (data) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', null);

              case 7:
                return _context.abrupt('return', User.viewerCanSee(viewer, data) ? new User(data, viewer) : null);

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function load(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return load;
    }()
  }, {
    key: 'clearCache',
    value: function clearCache(_ref3, id) {
      var dataloaders = _ref3.dataloaders;

      return dataloaders.UserLoader.clear(id.toString());
    }
  }, {
    key: 'loadUsers',
    value: function () {
      var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(context, args) {
        var where, users;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                where = args.search ? { name: { $regex: new RegExp('^' + args.search, 'ig') } } : {};
                users = _model.User.find(where, { _id: 1 }).sort({ createdAt: -1 });
                return _context2.abrupt('return', _ConnectionFromMongoCursor2.default.connectionFromMongoCursor(context, users, args, User.load));

              case 3:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadUsers(_x3, _x4) {
        return _ref4.apply(this, arguments);
      }

      return loadUsers;
    }()
  }]);

  return User;
}();

User.getLoader = function () {
  return new _dataloader2.default(function (ids) {
    return Promise.all(ids.map(function (id) {
      return _model.User.findOne({ _id: id });
    }));
  });
};

exports.default = User;