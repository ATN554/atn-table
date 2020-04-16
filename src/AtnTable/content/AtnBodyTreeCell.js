import React from "react";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnBodyTreeRow(props) {

  const toggleTree = () => {
    props.row.tableData.tree.open = !props.row.tableData.tree.open;
    props.tableRef.updateData();
  }

  const renderToggle = () => {
    return (
      props.row.tableData.tree.last ?
      <div key="tdm-last" className="atn-tbody-tree-td-margin"></div> :
      <div className="atn-tbody-tree-td-button-img">
        <AtnToggleButton
          checked={props.row.tableData.tree.open}
          disabled={false}
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
        style={{ width: props.column.width + "px" }}
      >
        {Array.from(Array(props.row.tableData.tree.level)).map((el, el_idx) => (
          <div key={"tdm-" + el_idx} className="atn-tbody-tree-td-margin"></div>
        ))}
        <div className="atn-tbody-tree-td-button">
          {renderToggle()}
        </div>
        <div className={"atn-tbody-tree-td-text atn-" + props.column.align + "-align"}>
          {props.renderDataCell(props.row, props.rowIndex, props.column, props.columnIndex)}
        </div>
      </div>
    </div>
  )
}