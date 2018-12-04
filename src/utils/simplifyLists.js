import { parseLists } from './sanitizeLists';
import replaceOldListWithProperlyNestedList from './replaceOldListWithProperlyNestedList';

export default function simplifyLists(el: HTMLElement): ?string {
  const editorClone: HTMLElement = el.cloneNode(true);
  parseLists(editorClone, 'ul').forEach((list) => {
    replaceOldListWithProperlyNestedList(list, editorClone);
  });
  parseLists(editorClone, 'ol').forEach((list) => {
    replaceOldListWithProperlyNestedList(list, editorClone);
  });
  return editorClone.innerHTML;
}
