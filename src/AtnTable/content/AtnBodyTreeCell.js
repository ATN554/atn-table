import React from "react";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnBodyTreeRow(props) {

  var tableData = props.row.tableData;
  var tree = tableData.tree;
  var column = props.column;

  const toggleTree = () => {
    tree.open = !tree.open;
    props.tableRef.updateData();
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
    >
      <div
        className={"atn-tbody-tree-td-container"}
        style={{ width: column.width + "px" }}
      >
        {Array.from(Array(tree.level)).map((el, el_idx) => (
          <div key={"tdm-" + el_idx} className="atn-tbody-tree-td-margin"></div>
        ))}
        <div className="atn-tbody-tree-td-button">
          {renderToggle()}
        </div>
        <div className={"atn-tbody-td-text atn-" + column.align + "-align"}>
          {props.renderDataCell(props.row, props.rowIndex, column, props.column_index)}
        </div>
      </div>
    </div>
  )
}