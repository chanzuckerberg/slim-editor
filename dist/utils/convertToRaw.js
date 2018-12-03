'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

function convertToRaw(editorState) {
  var state = editorState;
  var contentState = void 0;
  if (state instanceof _draftJs.ContentState) {
    console.warn('convertToRaw should only accept EditorState, not ContentState');
    contentState = state;
  } else {
    contentState = editorState.getCurrentContent();
  }
  return (0, _draftJs.convertToRaw)(contentState);
}

exports.default = convertToRaw;