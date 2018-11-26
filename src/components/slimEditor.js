// @flow
import { ContentBlockType, Editor } from "draft-js";
import React from "react";
import ReactDOM from "react-dom";

import { CONTENT_BLOCK_TYPES } from "../_deprecated/draftJSConstants";

export default class SlimEditor extends React.PureComponent<any, any, any> {
  _editorRef: ?HTMLElement;

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
            blockRendererFn={this.semanticBlockRenderer}
            ref={c => (this._editorRef = c)}
          />
        </div>
        <textarea value={this.state.html} />
      </div>
    );
  }

  componentDidUpdate = () => {
    if (this._editorRef && this._editorRef.editor) {
      this.setState({ html: this._editorRef.editor.innerHTML });
    }
  };

  semanticBlockRenderer = (contentBlock: ContentBlockType) => {
    // TODO: Render a custom component for lists
  };
}
