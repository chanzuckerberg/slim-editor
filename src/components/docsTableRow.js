// @flow
import { ContentBlock, EditorState, Entity } from 'draft-js';
import React from 'react';
import DocsTableCell from './docsTableCell.js';


import type { DocsTableEntityData } from './docsTableBlock.js';

type Props = {|
  colWidths: ?Array<number>,
  editorState: EditorState,
  entity: Object,
  entityKey: string,
  leftColHighlight: boolean,
  rowIndex: number,
  topRowHighlight: boolean,
|};

function getEntityDataID(rowIndex: number, cellIndex: number): string {
  return `cell_${rowIndex}_${cellIndex}`;
}

export default class DocsTableRow extends React.Component {
  props: Props;

  render() {
    const {
      colWidths, entity, leftColHighlight, rowIndex, topRowHighlight,
    } = this.props;

    const entityData: DocsTableEntityData = entity.getData();
    const { colsCount, rowHeights } = entityData;
    const cellsCount = colsCount;

    const tableCells = [];

    const rr = rowIndex;
    let cc = 0;
    while (cc < cellsCount) {
      const id = getEntityDataID(rr, cc);
      const rawContentState = entityData[id];

      tableCells.push(
        <DocsTableCell
          cellIndex={cc}
          colsCount={colsCount}
          colWidth={colWidths && colWidths[cc]}
          key={id}
          leftColHighlight={leftColHighlight}
          rawContentState={rawContentState}
          rowIndex={rr}
          topRowHighlight={topRowHighlight}
        />,
      );
      cc++;
    }
    return <tr>{tableCells}</tr>;
  }
}
