'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Business = require('../model/Business');

var _Business2 = _interopRequireDefault(_Business);

var _BusinessLoader = require('../loader/BusinessLoader');

var _BusinessLoader2 = _interopRequireDefault(_BusinessLoader);

var _BusinessConnection = require('../connection/BusinessConnection');

var _BusinessConnection2 = _interopRequireDefault(_BusinessConnection);

var _ViewerType = require('../type/ViewerType');

var _ViewerType2 = _interopRequireDefault(_ViewerType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'BusinessAdd',
  inputFields: {
    name: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    },
    likesCount: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLInt)
    },
    url: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLString)
    }
  },
  mutateAndGetPayload: function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(args, _ref2) {
      var user = _ref2.user;
      var name, likesCount, url, business;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (user) {
                _context.next = 2;
                break;
              }

              throw new Error('Unauthorized user');

            case 2:
              name = args.name, likesCount = args.likesCount, url = args.url;

              // Create new record

              _context.next = 5;
              return new _Business2.default({
                name: name,
                likesCount: likesCount,
                url: url
              }).save();

            case 5:
              business = _context.sent;
              return _context.abrupt('return', {
                id: business._id,
                error: null
              });

            case 7:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined);
    }));

    return function mutateAndGetPayload(_x, _x2) {
      return _ref.apply(this, arguments);
    };
  }(),
  outputFields: {
    businessEdge: {
      type: _BusinessConnection2.default.edgeType,
      resolve: function () {
        var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(_ref4, args, _ref5) {
          var id = _ref4.id;
          var user = _ref5.user;
          var business;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  _context2.next = 2;
                  return _BusinessLoader2.default.load(user, id);

                case 2:
                  business = _context2.sent;

                  if (business) {
                    _context2.next = 5;
                    break;
                  }

                  return _context2.abrupt('return', null);

                case 5:
                  return _context2.abrupt('return', {
                    cursor: (0, _graphqlRelay.toGlobalId)('Business', business),
                    node: business
                  });

                case 6:
                case 'end':
                  return _context2.stop();
              }
            }
          }, _callee2, undefined);
        }));

        return function resolve(_x3, _x4, _x5) {
          return _ref3.apply(this, arguments);
        };
      }()
    },
    viewer: {
      type: _ViewerType2.default,
      resolve: function () {
        var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(obj, args, _ref7) {
          var user = _ref7.user;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  return _context3.abrupt('return', user);

                case 1:
                case 'end':
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function resolve(_x6, _x7, _x8) {
          return _ref6.apply(this, arguments);
        };
      }()
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref8) {
        var error = _ref8.error;
        return error;
      }
    }
  }
});