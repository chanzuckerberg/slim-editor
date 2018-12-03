// @flow

import { CompositeDecorator } from 'draft-js';
import findEntitiesForType from '../utils/findEntitiesForType.js';

const entries = [];

module.exports = {
  // https://draftjs.org/docs/advanced-topics-decorators.html#compositedecorator
  register(decoratorType: string, Component: Function) {
    const strategy = findEntitiesForType.bind(null, decoratorType);
    entries.push({
      strategy,
      component: Component,
    });
  },
  get(): CompositeDecorator {
    return new CompositeDecorator(entries);
  },
};
