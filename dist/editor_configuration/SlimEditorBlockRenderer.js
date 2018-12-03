'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _draftJs = require('draft-js');

var _DocsBlockTypeToComponent = require('./DocsBlockTypeToComponent.js');

var _DocsBlockTypeToComponent2 = _interopRequireDefault(_DocsBlockTypeToComponent);

var _tryGetEntityAtContentState = require('../utils/tryGetEntityAtContentState');

var _tryGetEntityAtContentState2 = _interopRequireDefault(_tryGetEntityAtContentState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderBlock(contentBlock, blockProps) {
  var component = void 0;
  var props = void 0;
  var editable = void 0;
  switch (contentBlock.getType()) {
    case 'atomic':
      var contentState = blockProps.editorState.getCurrentContent();
      var entityKey = contentBlock.getEntityAt(0);
      // entity could be `null`.
      // This happens while pasting HTML from external sources and we failed
      // to parse its data.
      var entity = entityKey ? (0, _tryGetEntityAtContentState2.default)(contentState, entityKey) : null;
      if (entity) {
        component = _DocsBlockTypeToComponent2.default.getComponent(entity.getType());
        editable = false;
        props = _extends({}, blockProps, {
          entity: entity,
          entityKey: entityKey
        });
      }
      break;

    default:
      return null;
  }

  if (!component) {
    return null;
  }

  return {
    component: component,
    editable: editable,
    props: props
  };
}
module.exports = {
  renderBlock: renderBlock
};