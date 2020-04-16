import React from "react";
import AtnBodyTreeCell from "./AtnBodyTreeCell.js";
import AtnBodyCell from "./AtnBodyCell.js";

export default function AtnBodyTreeRow(props) {
  return (
    <div className="atn-tbody-tr">
      {props.columns.map((col, col_index) => (
        col.tree ?
        <AtnBodyTreeCell
          tableRef={props.tableRef}
          key={"tb" + col_index}
          column={col}
          columnIndex={col_index}
          row={props.row}
          rowIndex={props.rowIndex}
          renderDataCell={props.renderDataCell}
        /> :
        <AtnBodyCell
          key={"tb" + col_index}
          column={col}
          columnIndex={col_index}
          row={props.row}
          rowIndex={props.rowIndex}
          renderDataCell={props.renderDataCell}
        />
      ))}
    </div>
  )
}