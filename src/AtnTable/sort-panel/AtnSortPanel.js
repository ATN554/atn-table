import React from "react";
import "./sort.css";
import AtnHeadSortCell from "./AtnHeadSortCell.js";

export default class AtnSortPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleDragEnd = this.handleDragEnd.bind(this);
  }

  handleDragEnd(idFrom, idTo) {
    let columns = this.props.columns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.sortDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.sortDroppableId === idTo);

      let tmpId = colFrom.sort.id;
      colFrom.sort.id = colTo.sort.id;
      colTo.sort.id = tmpId;

      this.props.tableRef.updateColumns(columns, true, false);
    }
  }

  render() {
    return (
      <div className="atn-sort-container">
        <div className="atn-sort-title-tr">
          <div className="atn-sort-title-td">
            {this.props.title}
          </div>
        </div>
        {this.props.columns.map((col, col_index) => (
          <AtnHeadSortCell
            key={"th" + col.id}
            column={col}
            columnIndex={col_index}
            renderHeaderCell={this.props.renders.renderHeaderCell}
            onDragEnd={(idFrom, idTo) => {
              this.handleDragEnd(idFrom, idTo);
            }}
          />
        ))}
      </div>
    );
  }
}