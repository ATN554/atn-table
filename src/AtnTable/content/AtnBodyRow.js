import React from "react";
import AtnBodyCell from "./AtnBodyCell.js";
import AtnDetailsPanel from "./AtnDetailsPanel.js";

export default function AtnBodyRow(props) {
  const {
    columns,
    row,
    rowIndex,
    renderDataCell,
    renderDetailsPanel,
    setSelectedRow
  } = props;

  const domId = row.tableData.domId;

  return (
    <div
      id={domId}
      className={row.tableData.selected ? "atn-tbody-tr selected" : "atn-tbody-tr"}
      onClick={() => setSelectedRow(row)}
      onTouchEnd={() => setSelectedRow(row)}
    >
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