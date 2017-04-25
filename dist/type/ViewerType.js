'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _NodeInterface = require('../interface/NodeInterface');

var _UserType = require('./UserType');

var _UserType2 = _interopRequireDefault(_UserType);

var _BusinessType = require('./BusinessType');

var _BusinessType2 = _interopRequireDefault(_BusinessType);

var _loader = require('../loader');

var _UserConnection = require('../connection/UserConnection');

var _UserConnection2 = _interopRequireDefault(_UserConnection);

var _BusinessConnection = require('../connection/BusinessConnection');

var _BusinessConnection2 = _interopRequireDefault(_BusinessConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Viewer',
  description: '...',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Viewer'),
      me: {
        type: _UserType2.default,
        resolve: function resolve(root, args, context) {
          return _loader.UserLoader.load(context, context.user._id);
        }
      },
      user: {
        type: _UserType2.default,
        args: {
          id: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
          }
        },
        resolve: function resolve(obj, args, context) {
          var _fromGlobalId = (0, _graphqlRelay.fromGlobalId)(args.id),
              id = _fromGlobalId.id;

          return _loader.UserLoader.load(context, id);
        }
      },
      users: {
        type: _UserConnection2.default.connectionType,
        args: _extends({}, _graphqlRelay.connectionArgs, {
          search: {
            type: _graphql.GraphQLString
          }
        }),
        resolve: function resolve(obj, args, context) {
          return _loader.UserLoader.loadUsers(context, args);
        }
      },
      business: {
        type: _BusinessType2.default,
        args: {
          id: {
            type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
          }
        },
        resolve: function resolve(obj, args, context) {
          var _fromGlobalId2 = (0, _graphqlRelay.fromGlobalId)(args.id),
              id = _fromGlobalId2.id;

          return _loader.BusinessLoader.load(context, id);
        }
      },
      businesses: {
        type: _BusinessConnection2.default.connectionType,
        args: _extends({}, _graphqlRelay.connectionArgs, {
          search: {
            type: _graphql.GraphQLString
          }
        }),
        resolve: function resolve(obj, args, context) {
          return _loader.BusinessLoader.loadBusinesses(context, args);
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_NodeInterface.NodeInterface];
  }
});