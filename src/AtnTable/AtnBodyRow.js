import React from "react";
import AtnBodyCell from "./AtnBodyCell.js";

export default function AtnBodyRow(props) {
  return (
    <div className="atn-tbody-tr">
      {props.columns.map((col, col_index) => (
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