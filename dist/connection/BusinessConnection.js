'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlRelay = require('graphql-relay');

var _BusinessType = require('../type/BusinessType');

var _BusinessType2 = _interopRequireDefault(_BusinessType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _graphqlRelay.connectionDefinitions)({
  name: 'Business',
  nodeType: _BusinessType2.default
});