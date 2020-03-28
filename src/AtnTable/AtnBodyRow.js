import React from "react";
import AtnBodyCell from "./AtnBodyCell.js";

export default class AtnBodyRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memProps: props,
      columns: props.columns,
      row: props.row,

      updateColumns: false,
      updateRow: false
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let changed = { update: false };
    if (prevState.memProps.updateColumns !== nextProps.updateColumns) {
      changed.columns = nextProps.columns;
      changed.updateColumns = nextProps.updateColumns;
      changed.update = true;
    }
    if (prevState.memProps.updateRow !== nextProps.updateRow) {
      changed.row = nextProps.row;
      changed.updateRow = nextProps.updateRow;
      changed.update = true;
    }
    if (changed.update) {
      return { ...prevState, ...changed, memProps: nextProps }
    } else {
      return null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.updateColumns !== nextState.updateColumns ||
      this.state.updateRow !== nextState.updateRow;
  }
  
  render() {
    let row = this.state.row;
    return (
      <div className="atn-tbody-tr">
        {this.state.columns.map((column, col_index) => (
          <AtnBodyCell
            key={"tb" + col_index}
            column={column}
            value={row[column.field]}
            updateColumn={this.state.updateColumns}
            updateValue={this.state.updateRow}
          />
        ))}
      </div>
    );
  }
}