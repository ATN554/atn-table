import React from "react";
import "./settings-panel.css";
import { sortColumns as fncSortColumns } from "../AtnEngine.js";
import AtnGroupCell from "./AtnGroupCell.js";
import AtnSortCell from "./AtnSortCell.js";
import AtnOrderCell from "./AtnOrderCell.js";
import AtnArrowButton from "../arrow-button/AtnArrowButton.js";
import getUID from "../../UID/uid";

export default function AtnSettingsPanel(props) {

  var dataOrderContainerId = getUID();
  var columnsOrderContainerId = getUID();
  
  const {
    tableRef,
    dataInfo,
    dataSettingsTitle,
    groupTitle,
    groupColumns,
    sortTitle,
    sortColumns,
    columnsSettingsTitle,
    orderColumns,
    renders
  } = props;

  const handleDragEndGroup = (idFrom, idTo) => {
    let columns = groupColumns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.groupDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.groupDroppableId === idTo);

      let tmpId = colFrom.group.id;
      colFrom.group.id = colTo.group.id;
      colTo.group.id = tmpId;

      tableRef.updateData();
    }
  }

  const handleChangeGroupOrder = (column, order) => {
    column.group.order = order;
    tableRef.updateData();
  }

  const handleDragEndSort = (idFrom, idTo) => {
    let columns = sortColumns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.sortDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.sortDroppableId === idTo);

      let tmpId = colFrom.sort.id;
      colFrom.sort.id = colTo.sort.id;
      colTo.sort.id = tmpId;

      tableRef.updateData();
    }
  }

  const handleDragEndOrder = (idFrom, idTo) => {
    let columns = orderColumns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.orderDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.orderDroppableId === idTo);

      let tmpId = colFrom.id;
      colFrom.id = colTo.id;
      colTo.id = tmpId;

      tableRef.updateColumns(true, false);
    }
  }

  const handleChangeSortOrder = (column, order) => {
    column.sort.order = order;
    tableRef.updateData();
  }

  const handleChangeActive = (column) => {
    let columns = groupColumns;
    let nextId = columns.filter((col) => col.group.id).reduce((pv, col) => Math.max(pv, col.group.id), 0);
    if (column.group.id) {
      column.group.id = 0;
    } else {
      column.group.id = (nextId + 1);
    }
    let fix_columns = columns.filter(col => col.group.id > 0);
    fix_columns = fncSortColumns(fix_columns, [['group', 'id'], ['id']]);
    fix_columns.forEach((column, column_idx) => {
      column.group.id = column_idx + 1;
    });
    tableRef.updateData();
  }

  const handleChangeVisibility = (column) => {
    column.visibility.visible = !column.visibility.visible;
    tableRef.updateData(false);
  }

  return (
    <React.Fragment>
      <div 
        id={dataOrderContainerId}
        className="atn-settings-container"
      >
        <div className="atn-settings-title">
          <div className="atn-settings-title-btn" />
          <div className="atn-settings-title-text">
            {dataSettingsTitle}
          </div>
          <div className="atn-settings-title-btn">
            <AtnArrowButton
              arrow="right"
              onClick={() => {
                document.getElementById(dataOrderContainerId).classList.add("left");
                document.getElementById(columnsOrderContainerId).classList.remove("right");
              }}
            />
          </div>
        </div>
       
        <div className="atn-settings-subcontainer">
          {
            dataInfo.hasGroups
              &&
            <React.Fragment>
              <div className="atn-settings-subtitle">
                {groupTitle}
              </div>
              {groupColumns.map((col, col_index) => (
                <AtnGroupCell
                  key={"gth" + col.id}
                  column={col}
                  columnIndex={col_index}
                  renderHeaderCell={renders.renderHeaderCell}
                  onDragEnd={handleDragEndGroup}
                  onChangeActive={handleChangeActive}
                  onChangeGroupOrder={handleChangeGroupOrder}
                />
              ))}
            </React.Fragment>
          }

          <div className="atn-settings-subtitle">
            {sortTitle}
          </div>
          {sortColumns.map((col, col_index) => (
            <AtnSortCell
              key={"sth" + col.id}
              column={col}
              columnIndex={col_index}
              renderHeaderCell={renders.renderHeaderCell}
              onDragEnd={handleDragEndSort}
              onChangeActive={handleChangeActive}
              onChangeSortOrder={handleChangeSortOrder}
            />
          ))}
        </div>
      </div>

      <div 
        id={columnsOrderContainerId}
        className="atn-settings-container right"
      >
        <div className="atn-settings-title">
          <div className="atn-settings-title-btn">
            <AtnArrowButton
              arrow="left"
              onClick={() => {
                document.getElementById(dataOrderContainerId).classList.remove("left");
                document.getElementById(columnsOrderContainerId).classList.add("right");
              }}
            />
          </div>
          <div className="atn-settings-title-text">
            {columnsSettingsTitle}
          </div>
          <div className="atn-settings-title-btn" />
        </div>

        <div className="atn-settings-subcontainer">
          {orderColumns.map((col, col_index) => (
            <AtnOrderCell
              key={"oth" + col.id}
              column={col}
              columnIndex={col_index}
              renderHeaderCell={renders.renderHeaderCell}
              onDragEnd={handleDragEndOrder}
              onChangeVisibility={handleChangeVisibility}
            />
          ))}
        </div>
      </div>
    </React.Fragment>      
  );
}