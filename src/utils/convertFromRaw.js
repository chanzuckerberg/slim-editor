// @flow
import { convertFromRaw as draftJSConvertFromRaw, EditorState } from "draft-js";

type ObjectLike = any;

export default function convertFromRaw(
  rawContentState: ObjectLike,
  editorState?: ?EditorState
): EditorState {
  if (rawContentState !== null && typeof rawContentState === "object") {
    let contentState;
    try {
      contentState = draftJSConvertFromRaw(rawContentState);
    } catch (ex) {
      // pass
    }

    if (contentState) {
      return editorState
        ? EditorState.push(editorState, contentState)
        : EditorState.createWithContent(contentState);
    }
  }
  return EditorState.createEmpty();
}
