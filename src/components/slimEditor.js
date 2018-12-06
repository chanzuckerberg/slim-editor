// @flow
import { ContentBlock, Editor, EditorState } from 'draft-js';
import React from 'react';
import SlimEditorBlockRenderer from '../editor_configuration/SlimEditorBlockRenderer.js';
import DocsConfig from '../editor_configuration/DocsConfig.js';

const DEFAULT_EDITOR_WIDTH = 696;

type Props = {|
  editorState: EditorState,
|};

DocsConfig.init();

export default class SlimEditor extends React.PureComponent<any, any, any> {
  props: Props;

  render() {
    return <Editor blockRendererFn={this._renderBlock} editorState={this.props.editorState} />;
  }

  _renderBlock = (contentBlock: ContentBlock): ?Object => {
    const { editorState } = this.props;
    const blockProps = {
      editorState,
      editorWidth: DEFAULT_EDITOR_WIDTH,
    };
    return SlimEditorBlockRenderer.renderBlock(contentBlock, blockProps);
  };
}
