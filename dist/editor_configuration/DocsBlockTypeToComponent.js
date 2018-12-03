'use strict';

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var globalMapping = new Map();
var componentMapping = new Map();

function _getComponent(blockType) {
  if (!componentMapping.has(blockType)) {
    var Component = (0, _nullthrows2.default)(globalMapping.get(blockType));
    componentMapping.set(blockType, Component);
  }
  return (0, _nullthrows2.default)(componentMapping.get(blockType));
}

function register(type, Component) {
  (0, _invariant2.default)(type && typeof type === 'string', 'invalid type %s', type);
  (0, _invariant2.default)(Component && typeof Component === 'function', 'invalid Component');
  globalMapping.set(type, Component);
}

function getComponent(blockType) {
  return globalMapping.has(blockType) ? _getComponent(blockType) : null;
}

module.exports = {
  getComponent: getComponent,
  register: register
};