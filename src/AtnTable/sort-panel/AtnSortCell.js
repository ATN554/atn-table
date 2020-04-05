import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import { ReactComponent as SortAZ } from "../svg/sort-az.svg";
import { ReactComponent as SortZA } from "../svg/sort-za.svg";
import { ReactComponent as VisibilityOn } from "../svg/on.svg";
import { ReactComponent as VisibilityOff } from "../svg/off.svg";

const renderSortAZ = (column, fnc) => {
  if (column.sort.locked) {
    if (column.sort.order === "asc") {
      return (<SortAZ className={"atn-column-sort-az"} style={{fill: "var(--svg-fill-disabled-active)"}} />);
    } else {
      return (<SortAZ className={"atn-column-sort-az"} style={{ fill: "var(--svg-fill-disabled-inactive)" }} />);
    }
  } else {
    if (column.sort.order === "asc") {
      return (<SortAZ className={"atn-column-sort-az active"} style={{ fill: "var(--svg-fill-enabled-active)" }} onClick={() => fnc(column, undefined)} />);
    } else {
      return (<SortAZ className={"atn-column-sort-az active"} style={{ fill: "var(--svg-fill-enabled-inactive)" }} onClick={() => fnc(column, "asc")} />);
    }
  }
}

const renderSortZA = (column, fnc) => {
  if (column.sort.locked) {
    if (column.sort.order === "desc") {
      return (<SortZA className={"atn-column-sort-za"} style={{ fill: "var(--svg-fill-disabled-active)" }} />);
    } else {
      return (<SortZA className={"atn-column-sort-za"} style={{ fill: "var(--svg-fill-disabled-inactive)" }} />);
    }
  } else {
    if (column.sort.order === "desc") {
      return (<SortZA className={"atn-column-sort-za active"} style={{ fill: "var(--svg-fill-enabled-active)" }} onClick={() => fnc(column, undefined)} />);
    } else {
      return (<SortZA className={"atn-column-sort-za active"} style={{ fill: "var(--svg-fill-enabled-inactive)" }} onClick={() => fnc(column, "desc")} />);
    }
  }
}

const renderVisibility = (column, fnc) => {
  if (column.visibility.locked) {
    if (column.visibility.visible) {
      return (<VisibilityOn className={"atn-column-show"} style={{ fill: "var(--svg-fill-disabled-active)" }} />);
    } else {
      return (<VisibilityOff className={"atn-column-show"} style={{ fill: "var(--svg-fill-disabled-inactive)" }} />);
    }
  } else {
    if (column.visibility.visible) {
      return (<VisibilityOn className={"atn-column-show active"} style={{ fill: "var(--svg-fill-enabled-active)" }} onClick={() => fnc(column)} />);
    } else {
      return (<VisibilityOff className={"atn-column-show active"} style={{ fill: "var(--svg-fill-enabled-inactive)" }} onClick={() => fnc(column)} />);
    }
  }
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

        {renderSortAZ(props.column, props.onChangeSortOrder)}
        {renderSortZA(props.column, props.onChangeSortOrder)}
        {renderVisibility(props.column, props.onChangeVisibility)}
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}