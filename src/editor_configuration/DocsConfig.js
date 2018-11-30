// @flow
import DocsBlockTypes from "./DocsBlockTypes.js";
import DocsBlockTypeToComponent from "./DocsBlockTypeToComponent.js";
import DocsDecorator from "./DocsDecorator.js";
import DocsImageDecorator from "../components/docsImageDecorator.js";
import DocsLinkDecorator from "../components/docsLinkDecorator.js";
import DocsMathDecorator from "../components/docsMathDecorator.js";
import DocsTable from "../components/docsTableBlock.js";
import DocsDecoratorTypes from "./DocsDecoratorTypes";

function registerCustomBlocks(specs: Array<Array<any>>): void {
  specs.forEach(spec => {
    const [type, view] = spec;
    DocsBlockTypeToComponent.register(type, view);
  });
}

function registerDecorator(specs: Array<Array<any>>): void {
  specs.forEach(spec => {
    const [type, view] = spec;
    DocsDecorator.register(type, view);
  });
}

function init(): void {
  registerCustomBlocks([[DocsBlockTypes.DOCS_TABLE, DocsTable]]);

  // Register Decorator
  registerDecorator([[DocsDecoratorTypes.DOCS_IMAGE, DocsImageDecorator]]);
  registerDecorator([[DocsDecoratorTypes.LINK, DocsLinkDecorator]]);
  registerDecorator([[DocsDecoratorTypes.DOCS_MATH, DocsMathDecorator]]);
}

module.exports = {
  init
};
