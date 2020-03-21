import React from "react";
import "./content.css";
import Draggable from "../DND/Draggable.js";
import Droppable from "../DND/Droppable.js";
import AtnTheadTr from "./AtnTheadTr.js";

const swap = (arr, a, b) => {
  arr[a] = arr.splice(b, 1, arr[a])[0];
}

export default class AtnContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: props.columns,
      data: props.data,
      totals: props.totals,
      resizer: props.resizer,
      deltaW: 7,
    };

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleHeaderResize(idx, width) {
    let columns = this.state.columns;
    columns[idx].tableData.width = width + this.state.deltaW;
    this.setState({ columns });
  }

  handleDragEnd(idFrom, idTo) {
    let columns = this.state.columns;
    let colFromId = idFrom.substr(9);
    let colToId = idTo.substr(9);
    if (colFromId !== colToId) {
      let colFromIdx = columns.findIndex((el) => el.tableData.id === colFromId);
      let colToIdx = columns.findIndex((el) => el.tableData.id === colToId);
      swap(columns, colFromIdx, colToIdx);
      this.setState({ columns });
    }
  }

  componentDidMount() {
    /*let resizer = document.getElementById("resizable-th-0");*/
  }

  render() {
    return (
      <div className="atn-table">
        <div className="atn-thead">
          <AtnTheadTr
            type="div"
            minWidth={10}
            maxWidth={250}
            resizer={this.state.resizer}
            className="atn-thead-tr"
            onChangeWidth={(idFrom, width) => {
              this.handleHeaderResize(idFrom.substr(13), width);
            }}
          >
            {this.state.columns.map((column, col_index) => (
              <Droppable
                id={"Droppable" + column.tableData.id}
                key={"th" + col_index}
                type="div"
                className="atn-thead-td"
              >
                <Draggable
                  id={"Draggable" + column.tableData.id}
                  droppable={"atn-thead-td"}
                  type="div"
                  axis="horizontal"
                  className="atn-thead-td-container"
                  style={{ width: (column.tableData.width - this.state.deltaW) + "px" }}
                  onDragEnd={(idFrom, idTo, x, y) => this.handleDragEnd(idFrom, idTo)}
                >
                  {column.title}
                </Draggable>
              </Droppable>
            ))}
          </AtnTheadTr>
        </div>

        <div className="atn-tbody">
          {this.state.data.map((row, row_index) => (
            <div className="atn-tbody-tr" key={"tr" + row_index}>
              {this.state.columns.map((column, col_index) => (
                <div className="atn-tbody-td" key={"td" + col_index}>
                  <div 
                    className="atn-tbody-td-container"
                    style={{ width: column.tableData.width + "px" }}
                  >
                    {row[column.field]}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="atn-tfoot">
          <div className="atn-tfoot-tr">
            {this.state.columns.map((column, col_index) => (
              <div key={"tf" + col_index} className="atn-tfoot-td">
                <div 
                  className="atn-tfoot-td-container"
                  style={{ width: column.tableData.width + "px" }}
                >
                  {this.state.totals[column.field]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}