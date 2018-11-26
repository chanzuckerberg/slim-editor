// @flow

import DocsDecorator from "./DocsDecorator.js";
import DocsImageDecorator from "../components/docsImageDecorator.js";
import DocsLinkDecorator from "../components/docsLinkDecorator.js";
import DocsDecoratorTypes from "./DocsDecoratorTypes";

function registerDecorator(specs: Array<Array<any>>): void {
  specs.forEach(spec => {
    const [type, view] = spec;
    DocsDecorator.register(type, view);
  });
}

function init(): void {
  // Register Decorator
  registerDecorator([[DocsDecoratorTypes.DOCS_IMAGE, DocsImageDecorator]]);
  registerDecorator([[DocsDecoratorTypes.LINK, DocsLinkDecorator]]);
}

module.exports = {
  init
};
