import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import AtnSortButton from "../sort-button/AtnSortButton.js";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnOrderCell(props) {
  const {
    column,
    columnIndex,
    renderHeaderCell,
    onDragEnd,
    onChangeVisibility
  } = props;

  const renderVisibility = () => {
    return (
      <div className="atn-settings-use">
        <AtnToggleButton
          checked={column.visibility.visible}
          disabled={column.visibility.locked}
          onChange={() => { onChangeVisibility(column) }}
        />
      </div>
    );
  }

  return (
    <Droppable
      id={column.dnd.orderDroppableId}
      type="div"
      className={column.dnd.droppable ? "atn-settings-tr atn-group-droppable" : "atn-settings-tr"}
    >
      <Draggable
        id={column.dnd.orderDraggableId}
        type="div"
        droppable={"atn-group-droppable"}
        className={column.dnd.draggable ? "atn-settings-td atn-cursor-move" : "atn-settings-td"}
        axis="vertical"
        onDragEnd={(idFrom, idTo, x, y) => onDragEnd(idFrom, idTo)}
        enabled={column.dnd.draggable}
      >
        {renderVisibility()}

        <div className="atn-settings-td-text no-sort">
          {renderHeaderCell(column, columnIndex)}
        </div>
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}