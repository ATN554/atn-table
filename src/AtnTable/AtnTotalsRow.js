import React from "react";
import AtnTotalsCell from "./AtnTotalsCell.js";

export default function AtnTotalsRow(props) {
  return (
    <div className="atn-tfoot-tr">
      {props.columns.map((col, col_index) => (
        <AtnTotalsCell
          key={"tf" + col_index}
          column={col}
          columnIndex={col_index}
          totals={props.totals}
          renderTotalsCell={props.renderTotalsCell}
        />
      ))}
    </div>
  )
}