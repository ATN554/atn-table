import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import AtnSortButton from "../sort-button/AtnSortButton.js";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

const renderSort = (column, fnc) => {
  return (
    <div className="atn-settings-sort">
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
    <div className="atn-settings-use">
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
      id={props.column.dnd.groupDroppableId}
      type="div"
      className={props.column.dnd.droppable && props.column.group.id > 0 ? "atn-settings-tr atn-group-droppable" : "atn-settings-tr"}
    >
      <Draggable
        id={props.column.dnd.groupDraggableId}
        type="div"
        droppable={"atn-group-droppable"}
        className={props.column.dnd.draggable && props.column.group.id > 0 ? "atn-settings-td atn-cursor-move" : "atn-settings-td"}
        axis="vertical"
        onDragEnd={(idFrom, idTo, x, y) => props.onDragEnd(idFrom, idTo)}
        enabled={props.column.dnd.draggable && props.column.group.id > 0}
      >
        {renderActivity(props.column, props.onChangeActive)}

        <div className="atn-settings-td-text">
          {props.renderHeaderCell(props.column, props.columnIndex)}
        </div>

        {renderSort(props.column, props.onChangeGroupOrder)}
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}