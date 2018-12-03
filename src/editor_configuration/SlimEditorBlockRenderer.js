import React from 'react';
import { ContentBlock } from 'draft-js';
import DocsBlockTypeToComponent from './DocsBlockTypeToComponent.js';
import tryGetEntityAtContentState from '../utils/tryGetEntityAtContentState';

type Props = {
  editorState: EditorState,
};

function renderBlock(contentBlock: ContentBlock, blockProps: Props) {
  let component;
  let props;
  let editable;
  switch (contentBlock.getType()) {
    case 'atomic':
      const contentState = blockProps.editorState.getCurrentContent();
      const entityKey = contentBlock.getEntityAt(0);
      // entity could be `null`.
      // This happens while pasting HTML from external sources and we failed
      // to parse its data.
      const entity = entityKey ? tryGetEntityAtContentState(contentState, entityKey) : null;
      if (entity) {
        component = DocsBlockTypeToComponent.getComponent(entity.getType());
        editable = false;
        props = {
          ...blockProps,
          entity,
          entityKey,
        };
      }
      break;

    default:
      return null;
  }

  if (!component) {
    return null;
  }

  return {
    component,
    editable,
    props,
  };
}
module.exports = {
  renderBlock,
};
