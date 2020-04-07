import React from "react";
import { ReactComponent as VisibilityOn } from "../svg/on.svg";
import { ReactComponent as VisibilityOff } from "../svg/off.svg";

export default function AtnBodyGroupRow(props) {

  const toggleGroup = () => {
    /*let level = props.row.tableData.group.level;
    let open = !props.row.tableData.group.open[props.columnIndex];
    props.row.tableData.group.open[props.columnIndex] = open;
    for (let i = props.rowIndex+1; i < props.rows.length; i++) {
      let row = props.rows[i];
      if (row.tableData.group.level > level) {
        row.tableData.group.open[props.columnIndex] = open;
      } else {
        break;
      }
    }*/
    props.tableRef.updateData();
  }

  const renderToggle = () => {
    if (props.row.tableData.show) {
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
          {props.renderDataCell(props.row, props.rowIndex, props.columns[props.row.tableData.group.level], props.row.tableData.group.level)}
        </div>
      </div>
    </div>
  )
}