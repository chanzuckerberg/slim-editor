// @flow

import React from "react";

type DocsTableEntityData = {
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

export default class DocsTable extends React.Component {
  render() {
    return (
      <table>
        <tr>
          <td>This is a simple custom table.</td>
        </tr>
      </table>
    );
  }
}
