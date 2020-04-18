import React from "react";
import AtnHeadCell from "./AtnHeadCell.js";

export default function AtnHeadRow(props) {
  const {
    columns,
    renderHeaderCell,
    updateColumns
  } = props;

  const handleHeaderResize = (column, width) => {
    column.width = width;
    updateColumns(undefined, false, false, false);
  }

  const handleDragEnd = (idFrom, idTo) => {
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.headDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.headDroppableId === idTo);
      
      let tmpId = colFrom.id;
      colFrom.id = colTo.id;
      colTo.id = tmpId;

      updateColumns(undefined, false, true, false);
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