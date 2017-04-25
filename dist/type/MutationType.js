'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

var _LoginEmailMutation = require('../mutation/LoginEmailMutation');

var _LoginEmailMutation2 = _interopRequireDefault(_LoginEmailMutation);

var _RegisterEmail = require('../mutation/RegisterEmail');

var _RegisterEmail2 = _interopRequireDefault(_RegisterEmail);

var _ChangePasswordMutation = require('../mutation/ChangePasswordMutation');

var _ChangePasswordMutation2 = _interopRequireDefault(_ChangePasswordMutation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: function fields() {
    return {
      // auth
      LoginEmail: _LoginEmailMutation2.default,
      RegisterEmail: _RegisterEmail2.default,
      ChangePassword: _ChangePasswordMutation2.default
    };
  }
});