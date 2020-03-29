import React from "react";
import AtnBodyCell from "./AtnBodyCell.js";

export default function AtnBodyRow(props) {
  return (
    <div className="atn-tbody-tr">
      {props.columns.map((column, col_index) => (
        <AtnBodyCell
          key={"tb" + col_index}
          column={column}
          value={props.row[column.field]}
        />
      ))}
    </div>
  )
}