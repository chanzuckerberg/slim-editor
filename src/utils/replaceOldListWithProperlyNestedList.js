import nullthrows from 'nullthrows';

export default function replaceOldListWithProperlyNestedList(
  list: SerializedListType,
  editorNode: HTMLElement,
) {
  const originalListElement = editorNode.querySelector(
    `.public-DraftStyleDefault-${list.tag}[data-offset-key="${list.key}"]`,
  );
  if (originalListElement) {
    const parentNode = nullthrows(originalListElement.parentNode);
    list.nodes.forEach(node => parentNode.insertBefore(node, originalListElement));
    parentNode.removeChild(originalListElement);
  }
}
