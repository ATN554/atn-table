import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
import AtnBodyGroupRow from "./AtnBodyGroupRow.js";
import AtnBodyRow from "./AtnBodyRow.js";
import AtnTotalsRow from './AtnTotalsRow.js';

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
          <React.Fragment key={"tr" + row_index}>
            {
              row.tableData.group.new
                && 
              props.groupColumns.slice(row.tableData.group.level).map((col, col_index) => (
                <AtnBodyGroupRow
                  key={"tr-group-" + row_index + "-" + col_index}
                  column={col}
                  columnIndex={col_index}
                  row={row}
                  rowIndex={row_index}
                  renderDataCell={props.renders.renderDataCell}
                  totalColumnWidths={props.totalColumnWidths}
                />)
              )
            }

            {
              row.tableData.group.open
                &&
              <AtnBodyRow
                key={"tr-data-" + row_index}
                columns={props.columns}
                row={row}
                rowIndex={row_index}
                renderDataCell={props.renders.renderDataCell}
              />
            }
          </React.Fragment>
        ))}
      </div>
      
      <div className="atn-tfoot">
        <AtnTotalsRow 
          columns={props.columns}
          totals={props.totals}
          renderTotalsCell={props.renders.renderTotalsCell}
        />
      </div>
    </div>
  )
}