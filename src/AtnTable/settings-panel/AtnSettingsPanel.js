import React from "react";
import "./group.css";
import "./sort.css";
import { sortColumns } from "../AtnEngine.js";
import AtnGroupCell from "./AtnGroupCell.js";
import AtnSortCell from "./AtnSortCell.js";

export default class AtnSettingsPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleDragEndGroup = this.handleDragEndGroup.bind(this);
    this.handleChangeGroupOrder = this.handleChangeGroupOrder.bind(this);

    this.handleDragEndSort = this.handleDragEndSort.bind(this);
    this.handleChangeSortOrder = this.handleChangeSortOrder.bind(this);

    this.handleChangeActive = this.handleChangeActive.bind(this);
    this.handleChangeVisibility = this.handleChangeVisibility.bind(this);
  }

  handleDragEndGroup(idFrom, idTo) {
    let columns = this.props.groupColumns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.groupDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.groupDroppableId === idTo);

      let tmpId = colFrom.group.id;
      colFrom.group.id = colTo.group.id;
      colTo.group.id = tmpId;

      this.props.tableRef.updateData();
    }
  }

  handleChangeGroupOrder(column, order) {
    column.group.order = order;
    this.props.tableRef.updateData();
  }

  handleDragEndSort(idFrom, idTo) {
    let columns = this.props.sortColumns;
    if (idFrom !== idTo) {
      let colFrom = columns.find((el) => el.dnd.sortDraggableId === idFrom);
      let colTo = columns.find((el) => el.dnd.sortDroppableId === idTo);

      let tmpId = colFrom.sort.id;
      colFrom.sort.id = colTo.sort.id;
      colTo.sort.id = tmpId;

      this.props.tableRef.updateData();
    }
  }

  handleChangeSortOrder(column, order) {
    column.sort.order = order;
    this.props.tableRef.updateData();
  }

  handleChangeActive(column) {
    let columns = this.props.groupColumns;
    let nextId = columns.filter((col) => col.group.id).reduce((pv, col) => Math.max(pv, col.group.id), 0);
    if (column.group.id) {
      column.group.id = 0;
    } else {
      column.group.id = (nextId + 1);
    }
    let fix_columns = columns.filter(col => col.group.id > 0);
    fix_columns = sortColumns(fix_columns, [['group', 'id'], ['id']]);
    fix_columns.forEach((column, column_idx) => {
      column.group.id = column_idx + 1;
    });
    this.props.tableRef.updateData();
  }

  handleChangeVisibility(column) {
    column.visibility.visible = !column.visibility.visible;
    this.props.tableRef.updateData();
  }

  render() {
    return (
      <div className="atn-sort-container">
        <div className="atn-sort-title-tr">
          <div className="atn-sort-title-td">
            {this.props.title}
          </div>
        </div>

        <div className="atn-group-title-tr">
          <div className="atn-group-title-td">
            {this.props.treeTitle}
          </div>
        </div>
        {this.props.treeColumns.map((col, col_index) => (
          <AtnSortCell
            key={"th" + col.id}
            column={col}
            columnIndex={col_index}
            renderHeaderCell={this.props.renders.renderHeaderCell}
            onDragEnd={this.handleDragEndSort}
            onChangeActive={this.handleChangeActive}
            onChangeSortOrder={this.handleChangeSortOrder}
          />
        ))}

        <div className="atn-group-title-tr">
          <div className="atn-group-title-td">
            {this.props.groupTitle}
          </div>
        </div>
        {this.props.groupColumns.map((col, col_index) => (
          <AtnGroupCell
            key={"gth" + col.id}
            column={col}
            columnIndex={col_index}
            renderHeaderCell={this.props.renders.renderHeaderCell}
            onDragEnd={this.handleDragEndGroup}
            onChangeActive={this.handleChangeActive}
            onChangeGroupOrder={this.handleChangeGroupOrder}
          />
        ))}

        <div className="atn-sort-title-tr">
          <div className="atn-sort-title-td">
            {this.props.sortTitle}
          </div>
        </div>
        {this.props.sortColumns.map((col, col_index) => (
          <AtnSortCell
            key={"th" + col.id}
            column={col}
            columnIndex={col_index}
            renderHeaderCell={this.props.renders.renderHeaderCell}
            onDragEnd={this.handleDragEndSort}
            onChangeActive={this.handleChangeActive}
            onChangeSortOrder={this.handleChangeSortOrder}
          />
        ))}
      </div>
    );
  }
}