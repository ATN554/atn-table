import React from "react";
import { ReactComponent as VisibilityOn } from "../svg/on.svg";
import { ReactComponent as VisibilityOff } from "../svg/off.svg";

export default function AtnBodyGroupRow(props) {

  const toggleGroup = () => {
    //let groupf = props.row.tableData.group.find(g => g.field === props.column.field);
    let groupf = props.row.tableData.group[props.columnIndex];
    groupf.open = !groupf.open;
    props.tableRef.updateData();
  }

  const renderToggle = () => {
    //if (props.row.tableData.group.find(g => g.field === props.column.field).open) {
    if (props.row.tableData.group[props.columnIndex].open) {
      return (
        <VisibilityOn
          className="atn-tbody-group-td-button-img"
          style={{ fill: "var(--svg-fill-enabled-active)" }}
          onClick={toggleGroup}
          onTouchEnd={toggleGroup}
        />
      );
    } else {
      return (
        <VisibilityOff
          className="atn-tbody-group-td-button-img"
          style={{ fill: "var(--svg-fill-enabled-inactive)" }}
          onClick={toggleGroup}
          onTouchEnd={toggleGroup}
        />
      );
    }
  }

  return (
    <div className="atn-tbody-tr">
      <div className="atn-tbody-group-td">
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
          <div className="atn-tbody-group-td-text">
            {props.renderDataGroupCell(props.row, props.rowIndex, props.column, props.columnIndex)}
          </div>
        </div>
      </div>
    </div>
  )
}