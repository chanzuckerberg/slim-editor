// @flow
import { ContentBlock, Editor } from "draft-js";
import React from "react";
import ReactDOM from "react-dom";
import SlimEditorBlockRenderer from "../editor_configuration/SlimEditorBlockRenderer.js";

import nullthrows from "nullthrows";
import { parseLists } from "../utils/sanitizeLists.js";

import type { SerializedListType } from "../utils/sanitizeLists.js";

const DEFAULT_EDITOR_WIDTH = 696;

export default class SlimEditor extends React.PureComponent<any, any, any> {
  _editorRef: ?React.Element<Editor>;

  constructor(props: { editorState: Object, updateState: Function }) {
    super(props);
    this.state = { html: "" };
  }

  render() {
    return (
      <div>
        <div style={{ display: "none" }}>
          <Editor
            blockRendererFn={this._renderBlock}
            editorState={this.props.editorState}
            onChange={this.props.updateState}
            ref={c => (this._editorRef = c)}
          />
        </div>
        <textarea value={this.state.html} />
      </div>
    );
  }

  componentDidUpdate = () => {
    if (this._editorRef && this._editorRef.editor) {
      const html = this.simplifyLists();
      html && this.setState({ html });
    }
  };

  _renderBlock = (contentBlock: ContentBlock): ?Object => {
    const { editorState } = this.props;
    const blockProps = {
      editorState,
      editorWidth: DEFAULT_EDITOR_WIDTH
    };
    return SlimEditorBlockRenderer.renderBlock(contentBlock, blockProps);
  };

  simplifyLists = (): ?string => {
    if (this._editorRef && this._editorRef.editor) {
      // $FlowFixMe this type is unknown but is HTMLElement
      const editorClone: HTMLElement = nullthrows(
        this._editorRef.editor
      ).cloneNode(true);
      parseLists(editorClone, "ul").forEach(list => {
        this._replaceOldListWithProperlyNestedList(list, editorClone);
      });
      parseLists(editorClone, "ol").forEach(list => {
        this._replaceOldListWithProperlyNestedList(list, editorClone);
      });
      return editorClone.innerHTML;
    }
  };

  _replaceOldListWithProperlyNestedList = (
    list: SerializedListType,
    editorNode: HTMLElement
  ) => {
    const originalListElement = editorNode.querySelector(
      `.public-DraftStyleDefault-${list.tag}[data-offset-key="${list.key}"]`
    );
    if (originalListElement) {
      const parentNode = nullthrows(originalListElement.parentNode);
      list.nodes.forEach(node =>
        parentNode.insertBefore(node, originalListElement)
      );
      parentNode.removeChild(originalListElement);
    }
  };
}
