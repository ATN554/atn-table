import React from "react";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnBodyTreeRow(props) {
  const {
    column,
    columnIndex,
    row,
    rowIndex,
    renderDataCell,
    updateData
  } = props;

  var tableData = row.tableData;
  var tree = tableData.tree;

  const toggleTree = () => {
    tree.open = !tree.open;
    updateData();
  }

  const renderToggle = () => {
    return (
      <div className="atn-tbody-tree-td-button-img">
        <AtnToggleButton
          checked={tree.open}
          disabled={tree.last}
          onChange={toggleTree}
        />
      </div>
    );
  }

  return (
    <div
      className="atn-tbody-td"
      style={{ flexBasis: column.width + "px" }}
    >
      {Array.from(Array(tree.level)).map((el, el_idx) => (
        <div key={"tdm-" + el_idx} className="atn-tbody-tree-td-margin"></div>
      ))}
      <div className="atn-tbody-tree-td-button">
        {renderToggle()}
      </div>
      <div className={"atn-tbody-td-text atn-" + column.align + "-align"}>
        {renderDataCell(row, rowIndex, column, columnIndex)}
      </div>
    </div>
  )
}