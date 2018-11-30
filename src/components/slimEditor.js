// @flow
import { ContentBlock, Editor, EditorState } from "draft-js";
import React from "react";
import ReactDOM from "react-dom";
import SlimEditorBlockRenderer from "../editor_configuration/SlimEditorBlockRenderer.js";

import nullthrows from "nullthrows";
import { parseLists } from "../utils/sanitizeLists.js";

import type { SerializedListType } from "../utils/sanitizeLists.js";

const DEFAULT_EDITOR_WIDTH = 696;

type Props = {|
  editorState: EditorState,
  debugMode?: boolean
|};
export default class SlimEditor extends React.PureComponent<any, any, any> {
  constructor(props: Props) {
    super(props);
    this.state = { html: "" };
  }

  render() {
    const { html } = this.state;
    if (this.props.debugMode) {
      return <textarea value={html} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  }

  componentDidUpdate = (prevProps: Props) => {
    if (prevProps.editorState !== this.props.editorState) {
      const el = document.createElement("div");

      const editor = (
        <Editor
          blockRendererFn={this._renderBlock}
          editorState={this.props.editorState}
        />
      );

      ReactDOM.render(editor, el);
      const html = this.simplifyLists(el);
      this.setState({ html });
      ReactDOM.unmountComponentAtNode(el);
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

  simplifyLists = (el: HTMLElement): ?string => {
    const editorClone: HTMLElement = el.cloneNode(true);
    parseLists(editorClone, "ul").forEach(list => {
      this._replaceOldListWithProperlyNestedList(list, editorClone);
    });
    parseLists(editorClone, "ol").forEach(list => {
      this._replaceOldListWithProperlyNestedList(list, editorClone);
    });
    return editorClone.innerHTML;
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
