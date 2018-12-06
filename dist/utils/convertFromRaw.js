'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = convertFromRaw;

var _DocsDecorator = require('../editor_configuration/DocsDecorator');

var _DocsDecorator2 = _interopRequireDefault(_DocsDecorator);

var _draftJs = require('draft-js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function convertFromRaw(rawContentState, editorState) {
  var decorator = _DocsDecorator2.default.get();
  if (rawContentState !== null && (typeof rawContentState === 'undefined' ? 'undefined' : _typeof(rawContentState)) === 'object') {
    var contentState = void 0;
    try {
      contentState = (0, _draftJs.convertFromRaw)(rawContentState, decorator);
    } catch (ex) {
      // pass
    }

    if (contentState) {
      return editorState ? _draftJs.EditorState.push(editorState, contentState) : _draftJs.EditorState.createWithContent(contentState);
    }
  }
  return _draftJs.EditorState.createEmpty(decorator);
}