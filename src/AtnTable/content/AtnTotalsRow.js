import React from "react";
import AtnTotalsCell from "./AtnTotalsCell.js";

export default function AtnTotalsRow(props) {
  const {
    columns,
    totals,
    renderTotalsCell
  } = props;

  return (
    <div className="atn-tfoot-tr">
      {columns.map((col, col_index) => (
        <AtnTotalsCell
          key={"tf" + col_index}
          column={col}
          columnIndex={col_index}
          totals={totals}
          renderTotalsCell={renderTotalsCell}
        />
      ))}
    </div>
  )
}