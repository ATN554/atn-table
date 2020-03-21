import React from "react";
import "./content.css";
import AtnHeadCell from "./AtnHeadCell.js";

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
      resizer: props.resizer
    };

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleHeaderResize(column, width) {
    let columns = this.state.columns;
    column.tableData.width = width;
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
          <div className="atn-thead-tr">
            {this.state.columns.map((col) => (
              <AtnHeadCell
                key={"th" + col.tableData.id}
                column={col}
                resizer={this.state.resizer}
                onChangeWidth={(column, width) => {
                  this.handleHeaderResize(column, width);
                }}
                onDragEnd={(idFrom, idTo) => {
                  this.handleDragEnd(idFrom, idTo);
                }}
              />
            ))}
          </div>
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