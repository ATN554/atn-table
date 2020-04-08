import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";
import { ReactComponent as SortAZ } from "../svg/sort-az.svg";
import { ReactComponent as SortZA } from "../svg/sort-za.svg";
import { ReactComponent as VisibilityOn } from "../svg/on.svg";
import { ReactComponent as VisibilityOff } from "../svg/off.svg";

const renderSortAZ = (column, fnc) => {
  if (column.group.locked) {
    if (column.group.order === "asc") {
      return (
        <SortAZ
          className={"atn-group-use-az"}
          style={{ fill: "var(--svg-fill-disabled-active)" }}
        />
      );
    } else {
      return (
        <SortAZ
          className={"atn-group-use-az"}
          style={{ fill: "var(--svg-fill-disabled-inactive)" }}
        />
      );
    }
  } else {
    if (column.group.order === "asc") {
      return (
        <SortAZ
          className={"atn-group-use-az active"}
          style={{ fill: "var(--svg-fill-enabled-active)" }}
        />
      );
    } else {
      return (
        <SortAZ
          className={"atn-group-use-az active"}
          style={{ fill: "var(--svg-fill-enabled-inactive)" }}
          onClick={() => fnc(column, "asc")}
          onTouchEnd={() => fnc(column, "asc")}
        />
      );
    }
  }
}

const renderSortZA = (column, fnc) => {
  if (column.group.locked) {
    if (column.group.order === "desc") {
      return (
        <SortZA
          className={"atn-group-use-za"}
          style={{ fill: "var(--svg-fill-disabled-active)" }}
        />
      );
    } else {
      return (
        <SortZA
          className={"atn-group-use-za"}
          style={{ fill: "var(--svg-fill-disabled-inactive)" }}
        />
      );
    }
  } else {
    if (column.group.order === "desc") {
      return (
        <SortZA
          className={"atn-group-use-za active"}
          style={{ fill: "var(--svg-fill-enabled-active)" }}
        />
      );
    } else {
      return (
        <SortZA
          className={"atn-group-use-za active"}
          style={{ fill: "var(--svg-fill-enabled-inactive)" }}
          onClick={() => fnc(column, "desc")}
          onTouchEnd={() => fnc(column, "desc")}
        />
      );
    }
  }
}

const renderActivity = (column, fnc) => {
  if (column.group.locked) {
    if (column.group.id > 0) {
      return (
        <VisibilityOn
          className={"atn-group-use"}
          style={{ fill: "var(--svg-fill-disabled-active)" }}
        />
      );
    } else {
      return (
        <VisibilityOff
          className={"atn-group-use"}
          style={{ fill: "var(--svg-fill-disabled-inactive)" }}
        />
      );
    }
  } else {
    if (column.group.id > 0) {
      return (
        <VisibilityOn
          className={"atn-group-use active"}
          style={{ fill: "var(--svg-fill-enabled-active)" }}
          onClick={() => fnc(column)}
          onTouchEnd={() => fnc(column)}
        />
      );
    } else {
      return (
        <VisibilityOff
          className={"atn-group-use active"}
          style={{ fill: "var(--svg-fill-enabled-inactive)" }}
          onClick={() => fnc(column)}
          onTouchEnd={() => fnc(column)}
        />
      );
    }
  }
}

export default function AtnGroupCell(props) {
  return (
    <Droppable
      id={props.column.dnd.groupDroppableId}
      type="div"
      className={props.column.dnd.droppable && props.column.group.id > 0 ? "atn-group-tc atn-group-droppable" : "atn-group-tc"}
    >
      <Draggable
        id={props.column.dnd.groupDraggableId}
        type="div"
        droppable={"atn-group-droppable"}
        className={props.column.dnd.draggable && props.column.group.id > 0 ? "atn-group-td atn-cursor-move" : "atn-group-td"}
        axis="vertical"
        onDragEnd={(idFrom, idTo, x, y) => props.onDragEnd(idFrom, idTo)}
        enabled={props.column.dnd.draggable && props.column.group.id > 0}
      >
        <div className="atn-group-td-text">
          {props.renderHeaderCell(props.column, props.columnIndex)}
        </div>

        {renderSortAZ(props.column, props.onChangeGroupOrder)}
        {renderSortZA(props.column, props.onChangeGroupOrder)}
        {renderActivity(props.column, props.onChangeActive)}
      </Draggable>

      <div>
      </div>
    </Droppable>
  );
}