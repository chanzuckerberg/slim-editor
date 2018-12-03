// @flow
import { ContentBlock, Editor, EditorState, Entity } from "draft-js";
import React from "react";
import DocsDecorator from "../editor_configuration/DocsDecorator";
import SlimEditorBlockRenderer from "../editor_configuration/SlimEditorBlockRenderer.js";

import convertFromRaw from "../utils/convertFromRaw";

type Props = {|
  cellIndex: number,
  colsCount: number,
  colWidth: ?number,
  rawContentState: ?Object,
  rowIndex: number
|};

function getLocalEditorState(props: Props): EditorState {
  const { rawContentState } = props;
  return convertFromRaw(rawContentState);
}

export default class DocsTableCell extends React.Component {
  props: Props;

  state = {
    localEditorState: EditorState.set(getLocalEditorState(this.props), {
      decorator: DocsDecorator.get()
    })
  };

  render() {
    const { cellIndex, colsCount, colWidth, rowIndex } = this.props;
    if (rowIndex === 0) {
      const dataColWidthProp =
        cellIndex !== colsCount - 1 ? { "data-colwidth": colWidth } : {};
      return (
        <th {...dataColWidthProp}>
          <Editor
            blockRendererFn={this._renderBlock}
            editorState={this.state.localEditorState}
          />
        </th>
      );
    }
    return (
      <td>
        <Editor
          blockRendererFn={this._renderBlock}
          editorState={this.state.localEditorState}
        />
      </td>
    );
  }

  _renderBlock = (contentBlock: ContentBlock): ?Object => {
    const blockProps = {
      editorState: this.state.localEditorState,
      editorWidth: this.props.colWidth
    };
    return SlimEditorBlockRenderer.renderBlock(contentBlock, blockProps);
  };
}
