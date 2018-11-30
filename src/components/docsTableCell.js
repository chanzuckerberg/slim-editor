// @flow
import { ContentBlock, Editor, EditorState, Entity } from "draft-js";
import React from "react";
import DocsDecorator from "../editor_configuration/DocsDecorator";
import SlimEditorBlockRenderer from "../editor_configuration/SlimEditorBlockRenderer.js";

import convertFromRaw from "../utils/convertFromRaw";

type Props = {
  cellIndex: number,
  colsCount: number,
  rawContentState: ?Object,
  rowIndex: number
};

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
    const { cellIndex, rowIndex, colsCount } = this.props;
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
      editorState: this.state.localEditorState
    };
    return SlimEditorBlockRenderer.renderBlock(contentBlock, blockProps);
  };
}
