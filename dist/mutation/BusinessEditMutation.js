'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _Business = require('../model/Business');

var _Business2 = _interopRequireDefault(_Business);

var _BusinessType = require('../type/BusinessType');

var _BusinessType2 = _interopRequireDefault(_BusinessType);

var _BusinessLoader = require('../loader/BusinessLoader');

var _BusinessLoader2 = _interopRequireDefault(_BusinessLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = (0, _graphqlRelay.mutationWithClientMutationId)({
  name: 'BusinessEdit',
  inputFields: {
    id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
    },
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
      var id, name, likesCount, url, business;
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
              id = args.id, name = args.name, likesCount = args.likesCount, url = args.url;

              // Check if the provided ID is valid

              _context.next = 5;
              return _Business2.default.findOne({
                _id: (0, _graphqlRelay.fromGlobalId)(id).id
              });

            case 5:
              business = _context.sent;

              if (business) {
                _context.next = 8;
                break;
              }

              throw new Error('Invalid businessId');

            case 8:
              _context.next = 10;
              return business.update({
                name: name,
                likesCount: likesCount,
                url: url
              });

            case 10:

              // TODO: mutation logic

              // Clear dataloader cache
              _BusinessLoader2.default.clearCache(business._id);

              return _context.abrupt('return', {
                id: business._id,
                error: null
              });

            case 12:
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
    business: {
      type: _BusinessType2.default,
      resolve: function resolve(obj, args, _ref3) {
        var user = _ref3.user;
        return _BusinessLoader2.default.load(user, obj.id);
      }
    },
    error: {
      type: _graphql.GraphQLString,
      resolve: function resolve(_ref4) {
        var error = _ref4.error;
        return error;
      }
    }
  }
});