import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
import AtnBodyRow from "./AtnBodyRow.js";

export default function AtnContent(props) {
  return (
    <div className="atn-table">
      <div className="atn-thead">
        <AtnHeadRow
          tableRef={props.tableRef}
          columns={props.columns}
          renderHeaderCell={props.renders.renderHeaderCell}
        />
      </div>

      <div className="atn-tbody">
        {props.data.map((row, row_index) => (
          <AtnBodyRow
            key={"tr" + row_index}
            columns={props.columns}
            row={row}
            rowIndex={row_index}
            renderDataCell={props.renders.renderDataCell}
          />
        ))}
      </div>
      
      <div className="atn-tfoot">
        <div className="atn-tfoot-tr">
          {props.columns.map((column, col_index) => (
            <div key={"tf" + col_index} className="atn-tfoot-td">
              <div 
                className={"atn-tfoot-td-container atn-" + (col_index === 0 ? "left" : column.align) + "-align"}
                style={{ width: column.width + "px" }}
              >
                {props.renders.renderTotalsCell(props.totals, column, col_index)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}