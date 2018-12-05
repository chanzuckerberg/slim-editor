'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = replaceOldListWithProperlyNestedList;

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function replaceOldListWithProperlyNestedList(list, editorNode) {
  var originalListElement = editorNode.querySelector('.public-DraftStyleDefault-' + list.tag + '[data-offset-key="' + list.key + '"]');
  if (originalListElement) {
    var parentNode = (0, _nullthrows2.default)(originalListElement.parentNode);
    list.nodes.forEach(function (node) {
      return parentNode.insertBefore(node, originalListElement);
    });
    parentNode.removeChild(originalListElement);
  }
}