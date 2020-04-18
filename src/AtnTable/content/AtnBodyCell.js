import React from "react";

export default function AtnBodyCell(props) {
  const {
    column,
    columnIndex,
    row,
    rowIndex,
    renderDataCell
  } = props;

  return (
    <div 
      className="atn-tbody-td"
    >
      <div 
        className={"atn-tbody-td-container atn-" + column.align + "-align"} 
        style={{ width: column.width + "px" }}
      >
        <div className="atn-tbody-td-text">
          {renderDataCell(row, rowIndex, column, columnIndex)}
        </div>
      </div>
    </div>
  )
}