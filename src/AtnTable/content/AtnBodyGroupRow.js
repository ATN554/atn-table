import React from "react";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnBodyGroupRow(props) {
  const {
    column,
    columnIndex,
    row,
    rowIndex,
    renderDataGroupCell,
    updateData
  } = props;

  const toggleGroup = () => {
    let groupf = row.tableData.group[columnIndex];
    groupf.open = !groupf.open;
    updateData();
  }

  const renderToggle = () => {
    return (
      <div className="atn-tbody-group-td-button-img">
        <AtnToggleButton
          checked={row.tableData.group[columnIndex].open}
          disabled={false}
          onChange={toggleGroup}
        />
      </div>
    );
  }

  return (
    <div className="atn-tbody-tr">
      <div className="atn-tbody-group-td">
        {Array.from(Array(columnIndex)).map((el, el_idx) => (
          <div key={"tdm-" + el_idx} className="atn-tbody-group-td-margin"></div>  
        ))}
        <div className="atn-tbody-group-td-button">
          {renderToggle()}
        </div>
        <div className="atn-tbody-td-text">
          {renderDataGroupCell(row, rowIndex, column, columnIndex)}
        </div>
      </div>
    </div>
  )
}