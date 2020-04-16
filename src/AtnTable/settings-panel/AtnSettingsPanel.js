import React from "react";
import "./settings-panel.css";
import { sortColumns as fncSortColumns } from "../AtnEngine.js";
import AtnTreeCell from "./AtnTreeCell.js";
import AtnGroupCell from "./AtnGroupCell.js";
import AtnSortCell from "./AtnSortCell.js";

export default function AtnSettingsPanel(props) {
  
  const {
    tableRef,
    dataInfo,
    title,
    treeTitle,
    treeColumns,
    groupTitle,
    groupColumns,
    sortTitle,
    sortColumns,
    renders
  } = props;

  const handleChangeTreeOrder = (column, order) => {
    column.sort.order = order;
    let parentColumn = treeColumns.find(col => col.tree === 1);
    parentColumn.sort.order = order;
    tableRef.updateData();
  }

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
/*
  const handleChangeVisibility = (column) => {
    column.visibility.visible = !column.visibility.visible;
    tableRef.updateData();
  }*/

  return (
    <div className="atn-settings-container">
      <div className="atn-settings-title">
        {title}
      </div>

      {
        dataInfo.isTreeData
          &&
        <React.Fragment>
          <div className="atn-settings-tree-title">
            {treeTitle}
          </div>
          {treeColumns.filter(col => col.tree === 2).map((col, col_index) => (
            <AtnTreeCell
              key={"th" + col.id}
              column={col}
              columnIndex={col_index}
              renderHeaderCell={renders.renderHeaderCell}
              onChangeTreeOrder={handleChangeTreeOrder}
            />
          ))}
        </React.Fragment>
      }
      
      {
        dataInfo.hasGroups
          &&
        <React.Fragment>
          <div className="atn-settings-group-title">
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

      <div className="atn-settings-sort-title">
        {sortTitle}
      </div>
      {sortColumns.map((col, col_index) => (
        <AtnSortCell
          key={"tth" + col.id}
          column={col}
          columnIndex={col_index}
          renderHeaderCell={renders.renderHeaderCell}
          onDragEnd={handleDragEndSort}
          onChangeActive={handleChangeActive}
          onChangeSortOrder={handleChangeSortOrder}
        />
      ))}
    </div>
  );
}