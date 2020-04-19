import React from "react";

export default function AtnDetailsPanel(props) {
  const {
    row,
    rowIndex,
    renderDetailsPanel
  } = props;

  return (
    <div
      className="atn-tbody-td-details"
    >
      {renderDetailsPanel(row, rowIndex)}
    </div>
  )
}