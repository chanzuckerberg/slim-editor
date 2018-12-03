// @flow

import React from 'react';
import { ContentBlock, EditorState, Entity } from 'draft-js';
import DocsTableRow from './docsTableRow.js';

export type DocsTableEntityData = {|
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
  topRowBgStyle?: ?'dark',
|};

type Props = {|
  block: ContentBlock,
  blockProps: {
    editorState: EditorState,
    editorWidth: number,
    entity: Entity,
    entityKey: string,
  },
|};

export default class DocsTable extends React.Component {
  props: Props;

  state: { containerWidth: number };

  constructor(props: Props) {
    super(props);
    this.state = { containerWidth: this.props.blockProps.editorWidth };
  }

  render() {
    const { blockProps } = this.props;
    const { containerWidth } = this.state;
    const { entity, editorState, entityKey } = blockProps;
    const entityData: DocsTableEntityData = entity.getData();
    const {
      colsCount, rowsCount, colWidths, leftColBgStyle, topRowBgStyle,
    } = entityData;
    const colWidthsInPx = colWidths && colWidths.map(width => Math.round(width * containerWidth));
    const tableRows = [];
    let rowIndex = 0;

    while (rowIndex < rowsCount) {
      tableRows.push(
        <DocsTableRow
          colWidths={colWidthsInPx}
          editorState={editorState}
          entity={entity}
          entityKey={entityKey}
          key={`row_${rowIndex}`}
          leftColHighlight={typeof leftColBgStyle === 'string'}
          rowIndex={rowIndex}
          topRowHighlight={typeof topRowBgStyle === 'string'}
        />,
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
