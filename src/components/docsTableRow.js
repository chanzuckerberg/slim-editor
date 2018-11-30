// @flow
import { ContentBlock, EditorState, Entity } from "draft-js";
import DocsTableCell from "./docsTableCell.js";

import React from "react";

import type { DocsTableEntityData } from "./docsTableBlock.js";

type Props = {
  editorState: EditorState,
  entity: Object,
  entityKey: string,
  rowIndex: number
};

function getEntityDataID(rowIndex: number, cellIndex: number): string {
  return "cell_" + rowIndex + "_" + cellIndex;
}

export default class DocsTableRow extends React.Component {
  props: Props;

  render() {
    const { entity, rowIndex } = this.props;

    const entityData: DocsTableEntityData = entity.getData();
    const { colsCount, colWidths, rowHeights } = entityData;
    let cellsCount = colsCount;

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
          key={id}
          rawContentState={rawContentState}
          rowIndex={rr}
        />
      );
      cc++;
    }
    //TODO: do I care about padding size? It should happen on the entire table not here
    return <tr>{tableCells}</tr>;
  }
}
