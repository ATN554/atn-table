import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import { ReactComponent as SortAZ } from "../svg/sort-az.svg";
import { ReactComponent as SortZA } from "../svg/sort-za.svg";
import { ReactComponent as VisibilityOn } from "../svg/on.svg";
import { ReactComponent as VisibilityOff } from "../svg/off.svg";

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
        <div className="atn-sort-td-text">
          {props.renderHeaderCell(props.column, props.columnIndex)}
        </div>

        {props.column.sort.order === 'asc' ? 
          <SortAZ className="atn-column-sort-az active" onClick={() => { console.log("AZ ac") }} /> :
          <SortAZ className="atn-column-sort-az" onClick={() => { console.log("AZ") }} />
        }

        {props.column.sort.order === 'desc' ?
          <SortZA className="atn-column-sort-za active" onClick={() => { console.log("ZA ac") }} /> :
          <SortZA className="atn-column-sort-za" onClick={() => { console.log("ZA") }} />
        }

        {props.column.visibility.visible ?
          <VisibilityOn className="atn-column-show active" onClick={() => { console.log("ON") }} /> :
          <VisibilityOff className="atn-column-show" onClick={() => { console.log("OFF") }} />
        }

      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}