import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import AtnSortButton from "../sort-button/AtnSortButton.js";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

const renderSort = (column, fnc) => {
  return (
    <div className="atn-column-sort">
      <AtnSortButton
        order={column.sort.order}
        disabled={column.sort.locked}
        onChange={(order) => { fnc(column, order) }}
        radio={false}
      />
    </div>
  );
}

const renderActivity = (column, fnc) => {
  return (
    <div className="atn-group-use">
      <AtnToggleButton
        checked={column.group.id > 0}
        disabled={column.group.locked}
        onChange={() => { fnc(column) }}
      />
    </div>
  );
}

export default function AtnSortCell(props) {
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
        <div className="atn-sort-td-text">
          {props.renderHeaderCell(props.column, props.columnIndex)}
        </div>

        {renderSort(props.column, props.onChangeSortOrder)}
        {renderActivity(props.column, props.onChangeActive)}
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}