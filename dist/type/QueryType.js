'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _NodeInterface = require('../interface/NodeInterface');

var _loader = require('../loader');

var _ViewerType = require('./ViewerType');

var _ViewerType2 = _interopRequireDefault(_ViewerType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'The root of all... queries',
  fields: function fields() {
    return {
      node: _NodeInterface.NodeField,
      viewer: {
        type: _ViewerType2.default,
        args: {},
        resolve: function () {
          var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(obj, args, _ref2) {
            var user = _ref2.user;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return _loader.ViewerLoader.load(user ? user._id : null);

                  case 2:
                    return _context.abrupt('return', _context.sent);

                  case 3:
                  case 'end':
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function resolve(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        }()

      }
    };
  }
});