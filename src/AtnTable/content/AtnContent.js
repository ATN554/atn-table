import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
import AtnBodyGroupRow from "./AtnBodyGroupRow.js";
import AtnBodyRow from "./AtnBodyRow.js";
import AtnTotalsRow from './AtnTotalsRow.js';

export default function AtnContent(props) {
  var p1 = props.pageSize === 0 ? 0 : props.currentPage * props.pageSize;
  var p2 = props.pageSize === 0 ? props.data.length : p1 + props.pageSize;
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
        {props.groupColumns.length === 0 ?
          props.data.slice(p1, p2).map((row, row_index) => (
            <AtnBodyRow
              key={"tr-data-" + row_index}
              columns={props.columns}
              row={row}
              rowIndex={row_index}
              renderDataCell={props.renders.renderDataCell}
            />
          )) :
          props.data.filter(row => row.tableData.gid >= p1 && row.tableData.gid < p2).map((row, row_index) => (
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
                  columnIndex={row.tableData.level + col_index}
                  row={row}
                  rowIndex={row_index}
                  renderDataGroupCell={props.renders.renderDataGroupCell}
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
          ))
        }
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