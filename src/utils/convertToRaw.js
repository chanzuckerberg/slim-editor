// @flow

import {
  EditorStateType,
  ContentState,
  convertToRaw as draftJSConvertToRaw
} from "draft-js";

function convertToRaw(editorState: EditorStateType): Object {
  const state: any = editorState;
  let contentState;
  if (state instanceof ContentState) {
    console.warn(
      "convertToRaw should only accept EditorState, not ContentState"
    );
    contentState = state;
  } else {
    contentState = editorState.getCurrentContent();
  }
  return draftJSConvertToRaw(contentState);
}

export default convertToRaw;
