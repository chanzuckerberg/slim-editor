// @flow

import { ContentState, Entity } from "draft-js";

function tryGetEntityAtContentState(
  contentState: ContentState,
  entityKey: string
): ?Entity {
  try {
    return contentState.getEntity(entityKey);
  } catch (ex) {
    // entity was removed, we should clean up `contentState` later.
    console.warn(ex);
    return null;
  }
}

export default tryGetEntityAtContentState;
