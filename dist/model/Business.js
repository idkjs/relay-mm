'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Defining a schema for Business
var Schema = new _mongoose2.default.Schema({
  name: {
    type: String,
    required: true
  },
  likesCount: {
    type: Number,
    required: true
  },
  url: {
    type: String,
    required: true,
    index: true
  }
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  },
  collection: 'businesses'
});

exports.default = _mongoose2.default.model('Business', Schema);