import React from "react";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnBodyGroupRow(props) {

  const toggleGroup = () => {
    let groupf = props.row.tableData.group[props.columnIndex];
    groupf.open = !groupf.open;
    props.tableRef.updateData();
  }

  const renderToggle = () => {
    return (
      <div className="atn-tbody-group-td-button-img">
        <AtnToggleButton
          checked={props.row.tableData.group[props.columnIndex].open}
          disabled={false}
          onChange={toggleGroup}
        />
      </div>
    );
  }

  return (
    <div className="atn-tbody-tr">
      <div className="atn-tbody-td">
        <div 
          className="atn-tbody-group-td-container"
          style={{ width: props.totalColumnsWidth + "px" }}
        >
          {Array.from(Array(props.columnIndex)).map((el, el_idx) => (
            <div key={"tdm-" + el_idx} className="atn-tbody-group-td-margin"></div>  
          ))}
          <div className="atn-tbody-group-td-button">
            {renderToggle()}
          </div>
          <div className="atn-tbody-td-text">
            {props.renderDataGroupCell(props.row, props.rowIndex, props.column, props.columnIndex)}
          </div>
        </div>
      </div>
    </div>
  )
}