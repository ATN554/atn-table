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
      style={{ flexBasis: column.width + "px" }}
    >
        <div className={"atn-tbody-td-text atn-" + column.align + "-align"}>
          {renderDataCell(row, rowIndex, column, columnIndex)}
        </div>
    </div>
  )
}