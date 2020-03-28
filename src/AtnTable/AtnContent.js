import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
import AtnBodyRow from "./AtnBodyRow.js";

export default class AtnContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memProps: props,
      columns: props.columns,
      data: props.data,
      totals: props.totals,

      updateColumns: false,
      updateData: false,
      updateTotals: false
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let changed = { update: false };
    if (prevState.memProps.updateColumns !== nextProps.updateColumns) {
      changed.columns = nextProps.columns;
      changed.updateColumns = nextProps.updateColumns;
      changed.update = true;
    }
    if (prevState.memProps.updateData !== nextProps.updateData) {
      changed.data = nextProps.data;
      changed.updateData = nextProps.updateData;
      changed.update = true;
    }
    if (prevState.memProps.updateTotals !== nextProps.updateTotals) {
      changed.totals = nextProps.totals;
      changed.updateTotals = nextProps.updateTotals;
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
      this.state.updateData !== nextState.updateData ||
      this.state.updateTotals !== nextState.updateTotals;
  }

  render() {
    let tableRef = this.props.tableRef;
    return (
      <div className="atn-table">
        <div className="atn-thead">
          <AtnHeadRow
            tableRef={tableRef}
            columns={this.state.columns}
            updateColumns={this.state.updateColumns}
          />
        </div>

        <div className="atn-tbody">
          {this.state.data.map((row, row_index) => (
            <AtnBodyRow
              key={"tr" + row_index}
              columns={this.state.columns}
              row={row}
              updateColumns={this.state.updateColumns}
              updateRow={this.state.updateData}
            />
          ))}
        </div>
       
        <div className="atn-tfoot">
          <div className="atn-tfoot-tr">
            {this.state.columns.map((column, col_index) => (
              <div key={"tf" + col_index} className="atn-tfoot-td">
                <div 
                  className={"atn-tfoot-td-container atn-" + (col_index === 0 ? "left" : column.align) + "-align"}
                  style={{ width: column.width + "px" }}
                >
                  {col_index === 0 && (this.state.totals["First-Column-Text"] || "")}
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