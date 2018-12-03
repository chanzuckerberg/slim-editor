'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _draftJs = require('draft-js');

function tryGetEntityAtContentState(contentState, entityKey) {
  try {
    return contentState.getEntity(entityKey);
  } catch (ex) {
    // entity was removed, we should clean up `contentState` later.
    console.warn(ex);
    return null;
  }
}

exports.default = tryGetEntityAtContentState;