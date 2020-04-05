import React from "react";
import "./group.css";
import AtnGroupCell from "./AtnGroupCell.js";

export default class AtnGroupPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.handleChangeActive = this.handleChangeActive.bind(this);
    this.handleChangeGroupOrder = this.handleChangeGroupOrder.bind(this);
  }

  handleDragEnd(idFrom, idTo) {
    let columns = this.props.columns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.groupDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.groupDroppableId === idTo);

      let tmpId = colFrom.group.id;
      colFrom.group.id = colTo.group.id;
      colTo.group.id = tmpId;

      this.props.tableRef.updateData();
    }
  }

  handleChangeActive(column) {
    let columns = this.props.columns;
    let nextId = columns.filter((col) => col.group.id).reduce((pv, col) => Math.max(pv, col.group.id), 0);
    if (column.group.id) {
      column.group.id = undefined;
    } else {
      column.group.id = (nextId + 1);
    }
    this.props.tableRef.updateData();
  }

  handleChangeGroupOrder(column, order) {
    column.group.order = order;
    this.props.tableRef.updateData();
  }

  render() {
    return (
      <div className="atn-group-container">
        <div className="atn-group-title-tr">
          <div className="atn-group-title-td">
            {this.props.title}
          </div>
        </div>
        {this.props.columns.map((col, col_index) => (
          <AtnGroupCell
            key={"th" + col.id}
            column={col}
            columnIndex={col_index}
            renderHeaderCell={this.props.renders.renderHeaderCell}
            onDragEnd={this.handleDragEnd}
            onChangeActive={this.handleChangeActive}
            onChangeGroupOrder={this.handleChangeGroupOrder}
          />
        ))}
      </div>
    );
  }
}