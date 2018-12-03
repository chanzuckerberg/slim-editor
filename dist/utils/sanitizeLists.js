'use strict';

var _nullthrows = require('nullthrows');

var _nullthrows2 = _interopRequireDefault(_nullthrows);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseLists(element, listTag) {
  var allLists = Array.from(element.querySelectorAll('.public-DraftStyleDefault-' + listTag));
  var structuredLists = allLists.map(_createStructuredListFromDOMElement);
  return _createDOMElementFromStructuredData(structuredLists, listTag);
}


function _createStructuredListFromDOMElement(listNode) {
  var structuredLists = [];
  Array.from(listNode.children).map(function (listNodeItem) {
    var depthRegexMatch = (0, _nullthrows2.default)(listNodeItem.className).match(/(?:public\-DraftStyleDefault\-depth)(\d)/);
    if (!depthRegexMatch || depthRegexMatch.length !== 2) {
      throw new Error('Unexpect DraftJS list representation');
    }
    var currentDepth = parseInt(depthRegexMatch[1]);
    var lastList = structuredLists[structuredLists.length - 1];
    if (!lastList || lastList.depth !== currentDepth) {
      structuredLists.push({
        children: [listNodeItem.children],
        depth: currentDepth
      });
    } else if (lastList.depth === currentDepth) {
      lastList.children.push(listNodeItem.children);
    }
  });
  return {
    key: (0, _nullthrows2.default)(listNode.getAttribute('data-offset-key')),
    data: structuredLists
  };
}

function _createDOMElementFromStructuredData(structuredLists, listElementString) {
  return structuredLists.map(function (structuredData) {
    var key = structuredData.key;

    var nodes = structuredData.data.map(function (listWrapper) {
      var listElement = document.createElement(listElementString);
      listElement.setAttribute('data-indent', listWrapper.depth.toString());
      listWrapper.children.forEach(function (listItemElementContent) {
        var listItemElement = document.createElement('li');
        var frag = document.createDocumentFragment();
        Array.from(listItemElementContent).forEach(function (item) {
          frag.appendChild(item);
        });
        listItemElement.appendChild(frag);
        listElement.appendChild(listItemElement);
      });
      return listElement;
    });
    return { key: key, nodes: nodes, tag: listElementString };
  });
}

module.exports = {
  parseLists: parseLists
};