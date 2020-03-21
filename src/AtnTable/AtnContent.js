import React from "react";
import "./content.css";
import Draggable from "../DND/Draggable.js";
import Droppable from "../DND/Droppable.js";
import AtnTheadTr from "./AtnTheadTr.js";

export default class AtnContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: props.columns,
      data: props.data,
      resizer: props.resizer,
    };

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
  }

  handleHeaderResize(idx, width) {
    let columns = this.state.columns;
    columns[idx].tableData.width = width;
    this.setState({ columns: columns });
  }

  render() {
    return (
      <div className="atn-table">
        <div className="atn-thead">
          <AtnTheadTr
            maxWidth={250}
            resizer={this.state.resizer}
            className="atn-thead-tr"
            onChangeWidth={(idFrom, width) => {
              this.handleHeaderResize(idFrom.substr(13), width);
            }}
          >
            {this.state.columns.map((column, col_index) => (
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
          </AtnTheadTr>
        </div>

        <div className="atn-tbody">

        </div>
      </div>
    );
  }
}