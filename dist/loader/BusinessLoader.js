'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dataloader = require('dataloader');

var _dataloader2 = _interopRequireDefault(_dataloader);

var _ConnectionFromMongoCursor = require('../connection/ConnectionFromMongoCursor');

var _ConnectionFromMongoCursor2 = _interopRequireDefault(_ConnectionFromMongoCursor);

var _Business = require('../model/Business');

var _Business2 = _interopRequireDefault(_Business);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Business = function () {
  function Business(data) {
    _classCallCheck(this, Business);

    this.id = data.id;
    this._id = data._id;
    this.name = data.name;
    this.likesCount = data.likesCount;
    this.url = data.url;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }

  _createClass(Business, null, [{
    key: 'viewerCanSee',
    value: function viewerCanSee(viewer, data) {
      // TODO: handle security

      return true;
    }
  }, {
    key: 'load',
    value: function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(viewer, id) {
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
                return Business.BusinessLoader.load(id.toString());

              case 4:
                data = _context.sent;
                return _context.abrupt('return', Business.viewerCanSee(viewer, data) ? new Business(data) : null);

              case 6:
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
    value: function clearCache(id) {
      return Business.BusinessLoader.clear(id.toString());
    }
  }, {
    key: 'loadBusinesses',
    value: function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(viewer, args) {
        var businesses;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                // TODO: specify conditions
                businesses = _Business2.default.find({});
                return _context2.abrupt('return', _ConnectionFromMongoCursor2.default.connectionFromMongoCursor(viewer, businesses, args, Business.load));

              case 2:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function loadBusinesses(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return loadBusinesses;
    }()
  }]);

  return Business;
}();

Business.BusinessLoader = new _dataloader2.default(function (ids) {
  return Promise.all(ids.map(function (id) {
    return _Business2.default.findOne({ _id: id });
  }));
});
exports.default = Business;