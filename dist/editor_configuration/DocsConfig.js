'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _DocsBlockTypes = require('./DocsBlockTypes.js');

var _DocsBlockTypes2 = _interopRequireDefault(_DocsBlockTypes);

var _DocsBlockTypeToComponent = require('./DocsBlockTypeToComponent.js');

var _DocsBlockTypeToComponent2 = _interopRequireDefault(_DocsBlockTypeToComponent);

var _DocsDecorator = require('./DocsDecorator.js');

var _DocsDecorator2 = _interopRequireDefault(_DocsDecorator);

var _docsImageDecorator = require('../components/docsImageDecorator.js');

var _docsImageDecorator2 = _interopRequireDefault(_docsImageDecorator);

var _docsLinkDecorator = require('../components/docsLinkDecorator.js');

var _docsLinkDecorator2 = _interopRequireDefault(_docsLinkDecorator);

var _docsMathDecorator = require('../components/docsMathDecorator.js');

var _docsMathDecorator2 = _interopRequireDefault(_docsMathDecorator);

var _docsTableBlock = require('../components/docsTableBlock.js');

var _docsTableBlock2 = _interopRequireDefault(_docsTableBlock);

var _DocsDecoratorTypes = require('./DocsDecoratorTypes');

var _DocsDecoratorTypes2 = _interopRequireDefault(_DocsDecoratorTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function registerCustomBlocks(specs) {
  specs.forEach(function (spec) {
    var _spec = _slicedToArray(spec, 2),
        type = _spec[0],
        view = _spec[1];

    _DocsBlockTypeToComponent2.default.register(type, view);
  });
}

function registerDecorator(specs) {
  specs.forEach(function (spec) {
    var _spec2 = _slicedToArray(spec, 2),
        type = _spec2[0],
        view = _spec2[1];

    _DocsDecorator2.default.register(type, view);
  });
}

function init() {
  registerCustomBlocks([[_DocsBlockTypes2.default.DOCS_TABLE, _docsTableBlock2.default]]);

  // Register Decorator
  registerDecorator([[_DocsDecoratorTypes2.default.DOCS_IMAGE, _docsImageDecorator2.default]]);
  registerDecorator([[_DocsDecoratorTypes2.default.LINK, _docsLinkDecorator2.default]]);
  registerDecorator([[_DocsDecoratorTypes2.default.DOCS_MATH, _docsMathDecorator2.default]]);
}

module.exports = {
  init: init
};