'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _graphqlRelay = require('graphql-relay');

var _NodeInterface = require('../interface/NodeInterface');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Business',
  description: 'Represents Business',
  fields: function fields() {
    return {
      id: (0, _graphqlRelay.globalIdField)('Business'),
      name: {
        type: _graphql.GraphQLString,
        description: '',
        resolve: function resolve(obj) {
          return obj.name;
        }
      },
      likesCount: {
        type: _graphql.GraphQLInt,
        description: '',
        resolve: function resolve(obj) {
          return obj.likesCount;
        }
      },
      url: {
        type: _graphql.GraphQLString,
        description: '',
        resolve: function resolve(obj) {
          return obj.url;
        }
      },
      createdAt: {
        type: _graphql.GraphQLString,
        description: '',
        resolve: function resolve(obj) {
          return obj.createdAt.toISOString();
        }
      },
      updatedAt: {
        type: _graphql.GraphQLString,
        description: '',
        resolve: function resolve(obj) {
          return obj.updatedAt.toISOString();
        }
      }
    };
  },
  interfaces: function interfaces() {
    return [_NodeInterface.NodeInterface];
  }
});