// @flow
import { ContentBlockType, Editor } from "draft-js";
import React from "react";
import ReactDOM from "react-dom";

import nullthrows from "nullthrows";
import { parseLists } from "../utils/sanitizeLists.js";

import type { SerializedListType } from "../utils/sanitizeLists.js";

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
      this.simplifyLists();
      // $FlowFixMe this type is unknown but is HTMLElement
      this.setState({ html: this._editorRef.editor.innerHTML });
    }
  };

  simplifyLists = () => {
    if (this._editorRef && this._editorRef.editor) {
      // $FlowFixMe this type is unknown but is HTMLElement
      const editor: HTMLElement = nullthrows(this._editorRef.editor);
      parseLists(editor, "ul").forEach(
        this._replaceOldListWithProperlyNestedList
      );
      parseLists(editor, "ol").forEach(
        this._replaceOldListWithProperlyNestedList
      );
    }
  };

  _replaceOldListWithProperlyNestedList = (list: SerializedListType) => {
    const originalListElement = document.querySelector(
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
