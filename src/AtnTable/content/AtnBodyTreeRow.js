import React from "react";
import AtnBodyTreeCell from "./AtnBodyTreeCell.js";
import AtnBodyCell from "./AtnBodyCell.js";

export default function AtnBodyTreeRow(props) {
  const {
    tableRef,
    columns,
    row,
    rowIndex,
    renderDataCell
  } = props;

  return (
    <div className="atn-tbody-tr">
      {columns.map((col, col_index) => (
        col.tree ?
        <AtnBodyTreeCell
          tableRef={tableRef}
          key={"tb" + col_index}
          column={col}
          columnIndex={col_index}
          row={row}
          rowIndex={rowIndex}
          renderDataCell={renderDataCell}
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