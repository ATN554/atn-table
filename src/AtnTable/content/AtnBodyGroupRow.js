import React from "react";

export default function AtnBodyGroupRow(props) {
  return (
    <div className="atn-tbody-tr">
      <div className="atn-tbody-td">
        <div
          className={"atn-tbody-td-container atn-left-align"}
          style={{ width: props.totalColumnWidths + "px" }}
        >
          {props.renderDataCell(props.row, props.rowIndex, props.column, props.columnIndex)}
        </div>
      </div>
    </div>
  )
}