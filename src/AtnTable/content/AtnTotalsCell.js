import React from "react";

export default function AtnTotalsCell(props) {
  return (
    <div className="atn-tfoot-td">
      <div
        className={"atn-tfoot-td-container atn-" + (props.columnIndex === 0 ? "left" : props.column.align) + "-align"}
        style={{ width: props.column.width + "px" }}
      >
        {props.renderTotalsCell(props.totals, props.column, props.columnIndex)}
      </div>
    </div>
  )
}