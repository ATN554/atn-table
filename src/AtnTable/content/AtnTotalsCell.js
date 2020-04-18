import React from "react";

export default function AtnTotalsCell(props) {
  const {
    column,
    columnIndex,
    totals,
    renderTotalsCell
  } = props;

  return (
    <div className="atn-tfoot-td">
      <div
        className={"atn-tfoot-td-container atn-" + (columnIndex === 0 ? "left" : column.align) + "-align"}
        style={{ width: column.width + "px" }}
      >
        <div className="atn-tfoot-td-text">
          {renderTotalsCell(totals, column, columnIndex)}
        </div>
      </div>
    </div>
  )
}