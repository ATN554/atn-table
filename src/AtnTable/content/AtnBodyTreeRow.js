import React from "react";
import AtnBodyTreeCell from "./AtnBodyTreeCell.js";
import AtnBodyCell from "./AtnBodyCell.js";

export default function AtnBodyTreeRow(props) {
  const {
    columns,
    row,
    rowIndex,
    renderDataCell,
    updateData
  } = props;

  return (
    <div className="atn-tbody-tr">
      {columns.map((col, col_index) => (
        col.tree ?
        <AtnBodyTreeCell
          key={"tb" + col_index}
          column={col}
          columnIndex={col_index}
          row={row}
          rowIndex={rowIndex}
          renderDataCell={renderDataCell}
          updateData={updateData}
        /> :
        <AtnBodyCell
          key={"tb" + col_index}
          column={col}
          columnIndex={col_index}
          row={row}
          rowIndex={rowIndex}
          renderDataCell={renderDataCell}
        />
      ))}
    </div>
  )
}