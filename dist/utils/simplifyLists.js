'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = simplifyLists;

var _sanitizeLists = require('./sanitizeLists');

var _replaceOldListWithProperlyNestedList = require('./replaceOldListWithProperlyNestedList');

var _replaceOldListWithProperlyNestedList2 = _interopRequireDefault(_replaceOldListWithProperlyNestedList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function simplifyLists(el) {
  var editorClone = el.cloneNode(true);
  (0, _sanitizeLists.parseLists)(editorClone, 'ul').forEach(function (list) {
    (0, _replaceOldListWithProperlyNestedList2.default)(list, editorClone);
  });
  (0, _sanitizeLists.parseLists)(editorClone, 'ol').forEach(function (list) {
    (0, _replaceOldListWithProperlyNestedList2.default)(list, editorClone);
  });
  return editorClone.innerHTML;
}