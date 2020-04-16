import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import AtnSortButton from "../sort-button/AtnSortButton.js";
import AtnToggleButton from "../toggle-button/AtnToggleButton.js";

export default function AtnSortCell(props) {
  const {
    column,
    columnIndex,
    renderHeaderCell,
    onDragEnd,
    onChangeActive,
    onChangeSortOrder
  } = props;

  const renderSort = () => {
    return (
      <div className="atn-settings-sort">
        <AtnSortButton
          order={column.sort.order}
          disabled={column.sort.locked}
          onChange={(order) => { onChangeSortOrder(column, order) }}
          radio={false}
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
      id={column.dnd.sortDroppableId}
      type="div"
      className={column.dnd.droppable ? "atn-settings-tr atn-sort-droppable" : "atn-settings-tr"}
    >
      <Draggable
        id={column.dnd.sortDraggableId}
        type="div"
        droppable={"atn-sort-droppable"}
        className={column.dnd.draggable ? "atn-settings-td atn-cursor-move" : "atn-settings-td"}
        axis="vertical"
        onDragEnd={(idFrom, idTo, x, y) => onDragEnd(idFrom, idTo)}
        enabled={column.dnd.draggable}
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