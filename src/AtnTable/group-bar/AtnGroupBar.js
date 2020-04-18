import React from "react";
import "./group-bar.css";
import AtnGroupBarCell from "./AtnGroupBarCell.js";
import { sortColumns } from "../AtnEngine.js";

export default function AtnGroupBar(props) {
  const {
    title,
    columns,
    renders,
    updateColumns,
    updateData
  } = props;

  const handleDragEnd = (idFrom, idTo) => {
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.groupBarDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.groupBarDroppableId === idTo);

      let tmpId = colFrom.group.id;
      colFrom.group.id = colTo.group.id;
      colTo.group.id = tmpId;

      updateColumns(undefined, false, true);
      updateData();
    }
  }

  const handleChangeActive = (column) => {
    let nextId = columns.filter((col) => col.group.id).reduce((pv, col) => Math.max(pv, col.group.id), 0);
    if (column.group.id) {
      column.group.id = 0;
    } else {
      column.group.id = (nextId + 1);
    }
    let fix_columns = columns.filter(col => col.group.id > 0);
    fix_columns = sortColumns(fix_columns, [['group', 'id'], ['id']]);
    fix_columns.forEach((column, column_idx) => {
      column.group.id = column_idx + 1;
    });
    updateColumns(undefined, false, true);
    updateData();
  }

  const handleChangeGroupOrder = (column, order) => {
    column.group.order = order;
    updateData();
  }

  return (
    <div className="atn-group-bar-container">
      <div className="atn-group-bar-title-tc">
        <div className="atn-group-bar-title-td">
          {title}
        </div>
      </div>
      {columns.map((col, col_index) => (
        <AtnGroupBarCell
          key={"gbth" + col.id}
          column={col}
          columnIndex={col_index}
          renderHeaderCell={renders.renderHeaderCell}
          onDragEnd={handleDragEnd}
          onChangeActive={handleChangeActive}
          onChangeGroupOrder={handleChangeGroupOrder}
        />
      ))}
    </div>
  );
}