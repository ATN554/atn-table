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
    this.props.tableRef.updateColumns(this.props.columns, false, false);
  }

  handleDragEnd(idFrom, idTo) {
    let columns = this.props.columns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.headDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.headDroppableId === idTo);
      
      let tmpId = colFrom.id;
      colFrom.id = colTo.id;
      colTo.id = tmpId;

      this.props.tableRef.updateColumns(columns, true, false);
    }
  }

  render() {
    return (
      <div className="atn-thead-tr">
        {this.props.columns.map((col, col_index) => (
          <AtnHeadCell
            key={"th" + col.id}
            column={col}
            columnIndex={col_index}
            renderHeaderCell={this.props.renderHeaderCell}
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