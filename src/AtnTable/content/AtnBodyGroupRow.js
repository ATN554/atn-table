import React from "react";
import { ReactComponent as VisibilityOn } from "../svg/on.svg";
import { ReactComponent as VisibilityOff } from "../svg/off.svg";

export default function AtnBodyGroupRow(props) {

  const toggleGroup = () => {
    let groupf = props.row.tableData.group.find(g => g.field === props.column.field);
    groupf.open = !groupf.open;
    props.tableRef.updateData();
  }

  const renderToggle = () => {
    if (props.row.tableData.group.find(g => g.field === props.column.field).open) {
      return (<VisibilityOn style={{ fill: "var(--svg-fill-enabled-active)" }} onClick={toggleGroup} />);
    } else {
      return (<VisibilityOff style={{ fill: "var(--svg-fill-enabled-inactive)" }} onClick={toggleGroup} />);
    }
  }

  return (
    <div className="atn-tbody-tr">
      <div 
        className="atn-tbody-group-td"
        style={{ width: props.totalColumnsWidth + "px" }}
      >
        <div className="atn-tbody-group-td-button">
          {renderToggle()}
        </div>
        <div className="atn-tbody-group-td-text">
          {props.renderDataCell(props.row, props.rowIndex, props.column, props.columnIndex)}
        </div>
      </div>
    </div>
  )
}