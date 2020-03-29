import React from "react";
import AtnHeadCell from "./AtnHeadCell.js";

export default class AtnHeadRow extends React.Component {
  constructor(props) {
    super(props);

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleHeaderResize(column, width) {
    column.width = width;
    this.props.tableRef.updateColumns(this.props.columns);
  }

  handleDragEnd(idFrom, idTo) {
    let columns = this.props.columns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.tableData.draggableId === idFrom);
      let colTo = columns.find((el) => el.tableData.droppableId === idTo);
      
      let tmpId = colFrom.id;
      colFrom.id = colTo.id;
      colTo.id = tmpId;

      this.props.tableRef.updateColumns(columns);
    }
  }

  render() {
    return (
      <div className="atn-thead-tr">
        {this.props.columns.map((col) => (
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
    );
  }
}