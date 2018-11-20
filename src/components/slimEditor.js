import React from 'react';
import {Editor, EditorState} from 'draft-js';

export default class SlimEditor extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Editor editorState={this.props.editorState} onChange={this.props.updateState} />
    );
  }
}
