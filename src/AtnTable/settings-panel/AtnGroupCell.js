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
      <div className="atn-settings-sort">
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
      <div className="atn-settings-use">
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
      id={column.dnd.groupDroppableId}
      type="div"
      className={column.dnd.droppable && column.group.id > 0 ? "atn-settings-tr atn-group-droppable" : "atn-settings-tr"}
    >
      <Draggable
        id={column.dnd.groupDraggableId}
        type="div"
        droppable={"atn-group-droppable"}
        className={column.dnd.draggable && column.group.id > 0 ? "atn-settings-td atn-cursor-move" : "atn-settings-td"}
        axis="vertical"
        onDragEnd={(idFrom, idTo, x, y) => onDragEnd(idFrom, idTo)}
        enabled={column.dnd.draggable && column.group.id > 0}
      >
        {renderActivity()}

        <div className="atn-settings-td-text">
          {renderHeaderCell(column, columnIndex)}
        </div>

        {renderSort()}
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}