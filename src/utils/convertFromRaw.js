// @flow

import DocsDecorator from '../editor_configuration/DocsDecorator';
import { convertFromRaw as draftJSConvertFromRaw, EditorState } from 'draft-js';

type ObjectLike = any;

export default function convertFromRaw(
  rawContentState: ObjectLike,
  editorState?: ?EditorState,
): EditorState {
  const decorator = DocsDecorator.get();
  if (rawContentState !== null && typeof rawContentState === 'object') {
    let contentState;
    try {
      contentState = draftJSConvertFromRaw(rawContentState, decorator);
    } catch (ex) {
      // pass
    }

    if (contentState) {
      return editorState
        ? EditorState.push(editorState, contentState)
        : EditorState.createWithContent(contentState);
    }
  }
  return EditorState.createEmpty(decorator);
}
