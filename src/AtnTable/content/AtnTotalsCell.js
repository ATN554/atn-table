import React from "react";

export default function AtnTotalsCell(props) {
  const {
    column,
    columnIndex,
    totals,
    renderTotalsCell
  } = props;

  return (
    <div
      className="atn-tfoot-td"
      style={{ flexBasis: column.width + "px" }}
    >
      <div className={"atn-tfoot-td-text atn-" + (columnIndex === 0 ? "left" : column.align) + "-align"}>
        {renderTotalsCell(totals, column, columnIndex)}
      </div>
    </div>
  )
}