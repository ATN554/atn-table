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
      totals: props.totals
    };

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleHeaderResize(column, width) {
    let columns = this.state.columns;
    column.width = width;
    this.setState({ columns });
  }

  handleDragEnd(idFrom, idTo) {
    let columns = this.state.columns;
    if (idFrom !== idTo) {
      let idxFrom = columns.findIndex((el) => el.tableData.draggableId === idFrom);
      let idxTo = columns.findIndex((el) => el.tableData.droppableId === idTo);
      swap(columns, idxFrom, idxTo);
      this.setState({ columns });
    }
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
                <div className="atn-tbody-td" key={"tb" + col_index} >
                  <div 
                    className="atn-tbody-td-container"
                    style={{ width: column.width + "px" }}
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
                  style={{ width: column.width + "px" }}
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