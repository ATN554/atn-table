import React from "react";
import AtnHeadCell from "./AtnHeadCell.js";

const swap = (arr, a, b) => {
  arr[a] = arr.splice(b, 1, arr[a])[0];
}

export default class AtnHeadRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memProps: props,
      columns: props.columns,

      updateColumns: false
    };

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleHeaderResize(column, width) {
    column.width = width;
    this.props.tableRef.updateColumns(this.state.columns);
  }

  handleDragEnd(idFrom, idTo) {
    let columns = this.state.columns;
    if (idFrom !== idTo) {
      let idxFrom = columns.findIndex((el) => el.tableData.draggableId === idFrom);
      let idxTo = columns.findIndex((el) => el.tableData.droppableId === idTo);
      swap(columns, idxFrom, idxTo);
      this.props.tableRef.updateColumns(columns);
    }
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let changed = { update: false };
    if (prevState.memProps.updateColumns !== nextProps.updateColumns) {
      changed.columns = nextProps.columns;
      changed.updateColumns = nextProps.updateColumns;
      changed.update = true;
    }
    if (changed.update) {
      return { ...prevState, ...changed, memProps: nextProps }
    } else {
      return null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.updateColumns !== nextState.updateColumns;
  }

  render() {
    return (
      <div className="atn-thead-tr">
        {this.state.columns.map((col) => (
          <AtnHeadCell
            key={"th" + col.tableData.id}
            column={col}
            updateColumn={this.state.updateColumns}
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