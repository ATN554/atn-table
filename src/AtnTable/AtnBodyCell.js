import React from "react";

export default function AtnBodyRow(props) {
  return (
    <div className="atn-tbody-td">
      <div
        className={"atn-tbody-td-container atn-" + props.column.align + "-align"}
        style={{ width: props.column.width + "px" }}
      >
        {props.renderDataCell(props.row, props.rowIndex, props.column, props.columnIndex)}
      </div>
    </div>
  )
}