import { Editor, EditorState } from 'draft-js';
import React from 'react';
import ReactDOM from 'react-dom';
import nullthrows from 'nullthrows';
import SlimEditor from '../components/slimEditor.js';
import convertFromRaw from './convertFromRaw.js';
import simplifyLists from './simplifyLists.js';

export default function convertDraftEditorStateToHTML(data) {
  let editorState = null;
  if (data !== null && typeof data === 'object') {
    if (data instanceof EditorState) {
      editorState = data;
    } else {
      editorState = convertFromRaw(data);
    }
  }

  if (!editorState) {
    return `<div>${JSON.stringify(data || '')}</div>`;
  }

  const el = document.createElement('div');
  const editor = <SlimEditor editorState={editorState} />;
  ReactDOM.render(editor, el);
  const html = simplifyLists(el);
  ReactDOM.unmountComponentAtNode(el);
  return html;
}
