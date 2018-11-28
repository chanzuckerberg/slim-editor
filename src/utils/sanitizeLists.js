// @flow
import nullthrows from "nullthrows";

export type SerializedListType = {
  key: string,
  nodes: Array<HTMLElement>,
  tag: string
};

function parseLists(
  element: HTMLElement,
  listTag: string
): Array<SerializedListType> {
  const allLists = Array.from(
    element.querySelectorAll(`.public-DraftStyleDefault-${listTag}`)
  );
  const structuredLists = allLists.map(_createStructuredListFromDOMElement);
  return _createDOMElementFromStructuredData(structuredLists, listTag);
}

function _createStructuredListFromDOMElement(
  listNode: HTMLElement
): {
  key: string,
  data: Array<{ depth: number, children: any }>
} {
  const structuredLists = [];
  Array.from(listNode.children).map(listNodeItem => {
    const depthRegex = nullthrows(listNodeItem.className).match(
      /(?:public\-DraftStyleDefault\-depth)(\d)/
    );
    if (!depthRegex || depthRegex.length !== 2) {
      throw "Unexpect DraftJS list representation";
    }
    const currentDepth = parseInt(depthRegex[1]);
    const lastList = structuredLists[structuredLists.length - 1];
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
    key: nullthrows(listNode.getAttribute("data-offset-key")),
    data: structuredLists
  };
}

function _createDOMElementFromStructuredData(
  structuredLists,
  listElementString
): Array<SerializedListType> {
  return structuredLists.map(structuredData => {
    const { key } = structuredData;
    const nodes = structuredData.data.map(listWrapper => {
      const listElement = document.createElement(listElementString);
      listElement.setAttribute("data-level", listWrapper.depth.toString());
      listWrapper.children.forEach(listItemElementContent => {
        const listItemElement = document.createElement("li");
        if (listItemElementContent.length !== 0) {
          listItemElement.appendChild(listItemElementContent.item(0));
        }
        listElement.appendChild(listItemElement);
      });
      return listElement;
    });
    return { key, nodes, tag: listElementString };
  });
}

module.exports = {
  parseLists
};
