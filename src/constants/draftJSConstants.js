// @flow

const CONTENT_BLOCK_TYPES = {
  UNSTYLED: "unstyled",
  PARAGRAPH: "paragraph",
  H1: "header-one",
  H2: "header-two",
  H3: "header-three",
  H4: "header-four",
  H5: "header-five",
  H6: "header-six",
  UL_ITEM: "unordered-list-item",
  OL_ITEM: "ordered-list-item",
  BLOCKQUOTE: "blockquote",
  CODE: "code",
  ATOMIC: "atomic"
};

const INLINE_STYLES = {
  BOLD: "BOLD",
  ITALIC: "ITALIC",
  UNDERLINE: "UNDERLINE"
};

module.exports = {
  CONTENT_BLOCK_TYPES,
  INLINE_STYLES
};
