import React from "react";
import AtnHeadCell from "./AtnHeadCell.js";

export default function AtnHeadRow(props) {
  const {
    tableRef,
    columns,
    renderHeaderCell
  } = props;

  const handleHeaderResize = (column, width) => {
    column.width = width;
    tableRef.updateColumns(false, false);
  }

  const handleDragEnd = (idFrom, idTo) => {
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.headDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.headDroppableId === idTo);
      
      let tmpId = colFrom.id;
      colFrom.id = colTo.id;
      colTo.id = tmpId;

      tableRef.updateColumns(true, false);
    }
  }

  return (
    <div className="atn-thead-tr">
      {columns.map((col, col_index) => (
        <AtnHeadCell
          key={"th" + col.id}
          column={col}
          columnIndex={col_index}
          renderHeaderCell={renderHeaderCell}
          onChangeWidth={handleHeaderResize}
          onDragEnd={handleDragEnd}
        />
      ))}
    </div>
  );
}