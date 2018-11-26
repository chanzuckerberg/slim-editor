// @flow

import findEntitiesForType from "../utils/findEntitiesForType.js";
import { CompositeDecorator } from "draft-js";

const entries = [];

module.exports = {
  // https://draftjs.org/docs/advanced-topics-decorators.html#compositedecorator
  register(decoratorType: string, Component: Function) {
    const strategy = findEntitiesForType.bind(null, decoratorType);
    entries.push({
      strategy: strategy,
      component: Component
    });
  },
  get(): CompositeDecorator {
    return new CompositeDecorator(entries);
  }
};
