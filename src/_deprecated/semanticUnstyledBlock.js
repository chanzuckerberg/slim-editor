import React from "react";

import { INLINE_STYLES } from "../constants/draftJSConstants";

// This component
function getInlineStyleElement(inlineStyle: any, text: string, start, end) {
  const styleList = [];
  let itr = inlineStyle.entries();
  let result = itr.next();
  while (result && !result.done) {
    styleList.push(result.value);
    result = itr.next();
  }

  const mergedStyles = Array.prototype.concat
    .apply([], styleList)
    .filter((val, index, arr) => arr.indexOf(val) === index);

  return _inlineStyleHelper(mergedStyles, text, start, end);
}

function _inlineStyleHelper(styles, text, start, end) {
  const style = styles[0];
  const children =
    styles.length === 1
      ? text.slice(start, end)
      : _inlineStyleHelper(styles.slice(1), text, start, end);

  let result;
  switch (style) {
    case INLINE_STYLES.BOLD:
      result = <strong key={`strong-${start}-${end}`}>{children}</strong>;
      break;
    case INLINE_STYLES.ITALIC:
      result = <em key={`em-${start}-${end}`}>{children}</em>;
      break;
    case INLINE_STYLES.UNDERLINE:
      result = <u key={`em-${start}-${end}`}>{children}</u>;
      break;
    default:
      throw "Unknown inline style type!";
  }
  return result;
}

export default class SemanticUnstyledBlock extends React.Component {
  render() {
    const children = [];
    const { block } = this.props;
    const { text } = block;

    if (block.getLength() === 0) {
      return null;
    }
    block.findStyleRanges(
      character => true,
      (start: number, end: number) => {
        // doesn't handle entity
        const inlineStyle = block.getInlineStyleAt(start);
        children.push(
          inlineStyle.size === 0
            ? text.slice(start, end)
            : getInlineStyleElement(inlineStyle, text, start, end)
        );
      }
    );

    return <p>{children}</p>;
  }
}
