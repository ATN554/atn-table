import React from "react";
import AtnBodyCell from "./AtnBodyCell.js";
import AtnDetailsPanel from "./AtnDetailsPanel.js";

export default function AtnBodyRow(props) {
  const {
    columns,
    row,
    rowIndex,
    renderDataCell,
    renderDetailsPanel
  } = props;

  return (
    <div className="atn-tbody-tr">
      {columns.map((col, col_index) => (
        <AtnBodyCell
          key={"tb" + col_index}
          column={col}
          columnIndex={col_index}
          row={row}
          rowIndex={rowIndex}
          renderDataCell={renderDataCell}
        />
      ))}
      {
        renderDetailsPanel 
          &&
        <AtnDetailsPanel
          row={row}
          rowIndex={rowIndex}
          renderDetailsPanel={renderDetailsPanel}
        />
      }
    </div>
  )
}