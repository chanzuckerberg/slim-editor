// @flow
import {
  ContentBlock, Editor, EditorState, Entity,
} from 'draft-js';
import React from 'react';
import DocsDecorator from '../editor_configuration/DocsDecorator';
import SlimEditorBlockRenderer from '../editor_configuration/SlimEditorBlockRenderer.js';

import convertFromRaw from '../utils/convertFromRaw';

type Props = {|
  cellIndex: number,
  colsCount: number,
  colWidth: ?number,
  leftColHighlight: boolean,
  rawContentState: ?Object,
  rowIndex: number,
  topRowHighlight: boolean,
|};

function getLocalEditorState(props: Props): EditorState {
  const { rawContentState } = props;
  return convertFromRaw(rawContentState);
}

export default class DocsTableCell extends React.Component {
  props: Props;

  state = {
    localEditorState: EditorState.set(getLocalEditorState(this.props), {
      decorator: DocsDecorator.get(),
    }),
  };

  render() {
    const {
      cellIndex,
      colsCount,
      colWidth,
      leftColHighlight,
      rowIndex,
      topRowHighlight,
    } = this.props;
    const isTopRow = rowIndex === 0;
    const isLeftColumn = cellIndex === 0;
    const isLastColumn = cellIndex === colsCount - 1;
    const shouldHighlightCell = (isTopRow && topRowHighlight) || (isLeftColumn && leftColHighlight);
    const styleProp = shouldHighlightCell ? { backgroundColor: '#efefef' } : {};
    const editor = (
      <Editor blockRendererFn={this._renderBlock} editorState={this.state.localEditorState} />
    );

    if (isTopRow) {
      return (
        <th data-colwidth={isLastColumn ? null : colWidth} style={styleProp}>
          {editor}
        </th>
      );
    }
    return (
      <td data-colwidth={isLastColumn ? null : colWidth} style={styleProp}>
        {editor}
      </td>
    );
  }

  _renderBlock = (contentBlock: ContentBlock): ?Object => {
    const blockProps = {
      editorState: this.state.localEditorState,
      editorWidth: this.props.colWidth,
    };
    return SlimEditorBlockRenderer.renderBlock(contentBlock, blockProps);
  };
}
