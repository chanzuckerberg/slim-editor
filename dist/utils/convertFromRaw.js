'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = convertFromRaw;

var _draftJs = require('draft-js');

function convertFromRaw(rawContentState, editorState) {
  if (rawContentState !== null && (typeof rawContentState === 'undefined' ? 'undefined' : _typeof(rawContentState)) === 'object') {
    var contentState = void 0;
    try {
      contentState = (0, _draftJs.convertFromRaw)(rawContentState);
    } catch (ex) {
      // pass
    }

    if (contentState) {
      return editorState ? _draftJs.EditorState.push(editorState, contentState) : _draftJs.EditorState.createWithContent(contentState);
    }
  }
  return _draftJs.EditorState.createEmpty();
}