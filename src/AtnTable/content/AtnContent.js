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
          row.tableData.plain ?
          <AtnBodyRow
            key={"tr-data-" + row_index}
            columns={props.columns}
            row={row}
            rowIndex={row_index}
            renderDataCell={props.renders.renderDataCell}
          /> :
          <React.Fragment key={"tr-data-c-" + row_index}>
            {row.tableData.new &&
              props.groupColumns.slice(row.tableData.level).map((col, col_index) => (
              row.tableData.group.find(g => g.field === col.field).show &&
              <AtnBodyGroupRow
                tableRef={props.tableRef}
                key={"tr-group-" + row_index + "-" + col_index}
                totalColumnsWidth={props.totalColumnsWidth}
                columns={props.groupColumns}
                column={col}
                columnIndex={col_index}
                row={row}
                rowIndex={row_index}
                renderDataCell={props.renders.renderDataCell}
              />
             ))
            }
            {row.tableData.show &&
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