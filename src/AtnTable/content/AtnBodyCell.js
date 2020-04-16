import React from "react";

export default function AtnBodyCell(props) {
  return (
    <div 
      className="atn-tbody-td"
    >
      <div 
        className={"atn-tbody-td-container atn-" + props.column.align + "-align"} 
        style={{ width: props.column.width + "px" }}
      >
        <div className="atn-tbody-td-text">
          {props.renderDataCell(props.row, props.rowIndex, props.column, props.columnIndex)}
        </div>
      </div>
    </div>
  )
}