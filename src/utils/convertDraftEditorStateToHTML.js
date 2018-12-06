// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import SlimEditor from '../components/slimEditor.js';
import convertFromRaw from './convertFromRaw.js';
import nullthrows from 'nullthrows';
import simplifyLists from './simplifyLists.js';
import { Editor, EditorState } from 'draft-js';

function noop() {
  // NOOP
}

export default function convertDraftEditorStateToHTML(data: Object) {

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

  // TODO: Alex.
  // Calling `ReactDOM.render()` within the rendering life-cycle of
  // another component will cause React to complain "arning:
  // _renderNewRootComponent(): Render methods should be a pure function of
  // props and state; triggering nested component updates from render is not
  // allowed. "
  // We should clean this up so we don't need to use `ReactDOM.render` to get
  // the HTML.
  const console: any = window.console || {};
  const error = console.error;
  // Suppress `console.error()` call.
  console.error = noop;
  ReactDOM.render(editor, el);
  const html = simplifyLists(el);
  ReactDOM.unmountComponentAtNode(el);
  // Restore `console.error()` call.
  console.error = error;
  return html;
}
