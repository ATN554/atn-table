import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";
import Droppable from "./DND/Droppable.js";
import { columns, data } from "./data.js";

export default function App() {
  return (
    <div className="content">
      <div className="atn-table-container">
        <p>Table toolbar</p>
        <div className="atn-table">
          <div className="atn-thead">
            <div className="atn-thead-tr">
              {columns.map((column, col_index) => (
                <Droppable
                  id={"Droppable" + col_index}
                  key={"div" + col_index}
                  type="div"
                  className="atn-thead-td"
                >
                  <Draggable
                    id={"Draggable" + col_index}
                    droppable={"atn-thead-td"}
                    type="div"
                    axis="horizontal"
                    className="atn-thead-td-container"
                    onDragStart={(idFrom, x, y) => {
                      console.log("start", idFrom, x, y);
                    }}
                    onDragEnd={(idFrom, idTo, x, y) => {
                      console.log("end", idFrom, idTo, x, y);
                    }}
                    onDragCancel={(idFrom, x, y) => {
                      console.log("cancel", idFrom, x, y);
                    }}
                  >
                    {column.title}
                  </Draggable>
                </Droppable>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
