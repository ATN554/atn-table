import React from "react";
import "./container.css";
import getUID from "../UID/uid.js";
import AtnContent from "./AtnContent.js";

const fillColumnsTableData = (columns) => {
  columns.forEach((column, column_idx) => {
    if (!column.tableData) {
      column.tableData = {};
    }
    column.tableData.id = column_idx;
    column.tableData.droppableId = getUID();
    column.tableData.draggableId = getUID();
  });
  return columns;
}

export default class AtnTable extends React.Component {
  constructor(props) {
    super(props);

    ;

    this.state = {
      columns: fillColumnsTableData(props.columns),
      data: props.data,
      totals: props.totals
    };
  }

  render() {
    return (
      <div className="content">
        <table className="atn-container">
          <thead className="atn-container-th">
            <tr className="atn-toolbar-tr">
              <td colSpan={5} className="atn-toolbar">
                <div style={{ height: "40px" }}>Toolbar</div>
              </td>
            </tr>
            <tr className="atn-groupbar-tr">
              <td colSpan={5} className="atn-groupbar">
                <div style={{ height: "30px" }}>Groupbar</div>
              </td>
            </tr>
          </thead>
          <tbody className="atn-container-tb">
            <tr className="atn-content-top-tr">
              <td colSpan={5} className="atn-menu-top">
                <div style={{ height: "30px" }}>Menu top</div>
              </td>
            </tr>
            <tr className="atn-content-mid-tr">
              <td className="atn-menu-left">
                menu left
              </td>
              <td className="atn-content-mid">
                <AtnContent
                  columns={this.state.columns}
                  data={this.state.data}
                  totals={this.state.totals}
                />
              </td>
              <td className="atn-menu-right">
                menu right
              </td>
            </tr>
            <tr className="atn-content-bot-tr">
              <td colSpan={5} className="atn-menu-bot">
                <div style={{ height: "30px" }}>Menu bottom</div>
              </td>
            </tr>
          </tbody>
          <tfoot className="atn-container-tf">
            <tr className="atn-container-tr">
              <td colSpan={5} className="atn-footer">
                <div style={{ height: "40px" }}>Footer</div>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    );
  }
}


/*

<div className="atn-table-container">
          <AtnContent
            columns={this.state.columns}
            data={this.state.data}
            resizer={this.state.resizer}
          />

          <div className="atn-tfoot">
            <div className="atn-tfoot-tr">
              <div className="atn-tfoot-td">
                Footer
                </div>
            </div>
          </div>
        </div>

*/
