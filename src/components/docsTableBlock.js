// @flow

import React from "react";
import { ContentBlock, EditorState, Entity } from "draft-js";
import DocsTableRow from "./docsTableRow.js";

export type DocsTableEntityData = {
  cellBgStyles?: ?{ [cellId: string]: string },
  cellColSpans?: ?{ [cellId: string]: number },
  cellRowSpans?: ?{ [cellId: string]: number },
  colWidths?: ?Array<number>,
  rowHeights?: ?{ [rowIndex: number]: number },
  colsCount: number,
  leftColBgStyle?: ?string,
  noBorders?: ?boolean,
  paddingSize?: ?string,
  rowsCount: number,
  topRowBgStyle?: ?"dark"
};

type Props = {
  block: ContentBlock,
  blockProps: {
    editorState: EditorState,
    entity: Entity,
    entityKey: string
  }
};

export default class DocsTable extends React.Component {
  props: Props;

  render() {
    const { blockProps } = this.props;
    const { entity, editorState, entityKey } = blockProps;
    const entityData = entity.getData();
    const { colsCount, rowsCount, colWidths } = entityData;

    const tableRows = [];
    let rowIndex = 0;
    while (rowIndex < rowsCount) {
      tableRows.push(
        <DocsTableRow
          editorState={editorState}
          entity={entity}
          entityKey={entityKey}
          key={"row_" + rowIndex}
          rowIndex={rowIndex}
        />
      );
      rowIndex++;
    }
    return (
      <table>
        <tbody>{tableRows}</tbody>
      </table>
    );
  }
}
