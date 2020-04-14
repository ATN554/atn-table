import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import AtnSortButton from "../sort-button/AtnSortButton.js";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

const renderSort = (column, fnc) => {
  return (
    <div className="atn-group-bar-sort">
      <AtnSortButton
        order={column.group.order}
        disabled={column.group.locked}
        onChange={(order) => { fnc(column, order) }}
        radio={true}
      />
    </div>
  );
}

const renderActivity = (column, fnc) => {
  return (
    <div className="atn-group-bar-use">
      <AtnToggleButton
        checked={column.group.id > 0}
        disabled={column.group.locked}
        onChange={() => { fnc(column) }}
      />
    </div>
  );
}

export default function AtnGroupCell(props) {
  return (
    <Droppable
      id={props.column.dnd.groupBarDroppableId}
      type="div"
      className={props.column.dnd.droppable && props.column.group.id > 0 ? "atn-group-bar-tc atn-group-bar-droppable" : "atn-group-bar-tc"}
    >
      <Draggable
        id={props.column.dnd.groupBarDraggableId}
        type="div"
        droppable={"atn-group-bar-droppable"}
        className={props.column.dnd.draggable && props.column.group.id > 0 ? "atn-group-bar-td atn-cursor-move" : "atn-group-bar-td"}
        axis="horizontal"
        onDragEnd={(idFrom, idTo, x, y) => props.onDragEnd(idFrom, idTo)}
        enabled={props.column.dnd.draggable && props.column.group.id > 0}
      >
        <div className="atn-group-bar-td-text">
          {props.renderHeaderCell(props.column, props.columnIndex)}
        </div>

        {renderSort(props.column, props.onChangeGroupOrder)}
        {renderActivity(props.column, props.onChangeActive)}
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}