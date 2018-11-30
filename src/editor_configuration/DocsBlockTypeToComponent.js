// @flow

import invariant from "invariant";
import nullthrows from "nullthrows";

const globalMapping: Map<string, Function> = new Map();
const componentMapping: Map<string, Function> = new Map();

function _getComponent(blockType: string): Function {
  if (!componentMapping.has(blockType)) {
    const Component = nullthrows(globalMapping.get(blockType));
    componentMapping.set(blockType, Component);
  }
  return nullthrows(componentMapping.get(blockType));
}

function register(type: string, Component: Function): void {
  invariant(type && typeof type === "string", "invalid type %s", type);
  invariant(Component && typeof Component === "function", "invalid Component");
  globalMapping.set(type, Component);
}

function getComponent(blockType: string): ?Function {
  return globalMapping.has(blockType) ? _getComponent(blockType) : null;
}

module.exports = {
  getComponent,
  register
};
