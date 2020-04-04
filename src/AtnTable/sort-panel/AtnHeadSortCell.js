import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";

export default function AtnHeadSortCell(props) {
  return (
    <Droppable
      id={props.column.dnd.sortDroppableId}
      type="div"
      className={props.column.dnd.droppable ? "atn-sort-tr atn-sort-droppable" : "atn-sort-tr"}
    >
      <Draggable
        id={props.column.dnd.sortDraggableId}
        type="div"
        droppable={"atn-sort-droppable"}
        className={props.column.dnd.draggable ? "atn-sort-td atn-cursor-move" : "atn-sort-td"}
        axis="vertical"
        onDragEnd={(idFrom, idTo, x, y) => props.onDragEnd(idFrom, idTo)}
        enabled={props.column.dnd.draggable}
      >
        <div
          style={{ display: "none", position: "absolute", left: "0", top: "0" }}
        >
          <input
            type="button"
            className="atn-round-button"
          />
        </div>
        {props.renderHeaderCell(props.column, props.columnIndex)}
      </Draggable>
    </Droppable>
  );
}