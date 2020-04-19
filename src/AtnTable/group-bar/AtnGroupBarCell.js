import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import AtnSortButton from "../sort-button/AtnSortButton.js";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnGroupCell(props) {
  const {
    column,
    columnIndex,
    renderHeaderCell,
    onDragEnd,
    onChangeActive,
    onChangeGroupOrder
  } = props;

  const renderSort = () => {
    return (
      <div className="atn-group-bar-sort">
        <AtnSortButton
          order={column.group.order}
          disabled={column.group.locked}
          onChange={(order) => { onChangeGroupOrder(column, order) }}
          radio={true}
        />
      </div>
    );
  }

  const renderActivity = () => {
    return (
      <div className="atn-group-bar-use">
        <AtnToggleButton
          checked={column.group.id > 0}
          disabled={column.group.locked}
          onChange={() => { onChangeActive(column) }}
        />
      </div>
    );
  }

  return (
    <Droppable
      id={column.dnd.groupBarDroppableId}
      type="div"
      className={column.dnd.droppable && column.group.id > 0 ? "atn-group-bar-droppable" : ""}
    >
      <Draggable
        id={column.dnd.groupBarDraggableId}
        type="div"
        droppable={"atn-group-bar-droppable"}
        className={column.dnd.draggable && column.group.id > 0 ? "atn-group-bar-td atn-cursor-move" : "atn-group-bar-td"}
        axis="horizontal"
        onDragEnd={(idFrom, idTo, x, y) => onDragEnd(idFrom, idTo)}
        enabled={column.dnd.draggable && column.group.id > 0}
      >
        {renderActivity()}

        <div className="atn-group-bar-td-text">
          {renderHeaderCell(column, columnIndex)}
        </div>

        {renderSort()}
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}