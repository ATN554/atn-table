import React from "react";
import "./styles.css";
import Draggable from "./DND/Draggable.js";
import Droppable from "./DND/Droppable.js";
import AtnTheadTr from "./AtnTheadTr/AtnTheadTr.js";
import { columns, data } from "./data.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: columns,
      data: data,
      widths: [100, 200, 50, 90],
      resizer: (
        <div></div>
      )
    };

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
  }

  handleHeaderResize(idx, width) {
    let widths = this.state.widths;
    widths[idx] = width;
    this.setState({ widths: widths });
  }

  render() {
    return (
      <div className="content">
        <div className="atn-table-container">
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
              </AtnTheadTr>
            </div>

            <div className="atn-tbody">
              
            </div>


          </div>

          <div className="atn-tfoot">
            <div className="atn-tfoot-tr">
              <div className="atn-tfoot-td">
                Footer
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
