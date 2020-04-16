import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
import AtnBodyGroupRow from "./AtnBodyGroupRow.js";
import AtnBodyRow from "./AtnBodyRow.js";
import AtnTotalsRow from './AtnTotalsRow.js';

export default function AtnContent(props) {
  const { tableRef, columns, treeColumns, groupColumns, totalColumnsWidth, data, currentPage, pageSize, totals, renders } = props;

  var p1 = pageSize === 0 ? 0 : currentPage * pageSize;
  var p2 = pageSize === 0 ? data.length : p1 + pageSize;

  var isTreeData = treeColumns.length > 0;
  var isGroupData = !isTreeData && groupColumns.length > 0;
  var isPlainData = !isTreeData && !isGroupData;

  const renderPlainData = (_data) => {
    return _data.map((row, row_index) => (
      <AtnBodyRow
        key={"tr-data-" + row_index}
        columns={columns}
        row={row}
        rowIndex={row_index}
        renderDataCell={renders.renderDataCell}
      />
    ));
  }

  const renderGroupData = (_data) => {
    return _data.map((row, row_index) => (
      <React.Fragment key={"tr-data-c-" + row_index}>
        {
          row.tableData.new
           &&
          groupColumns.slice(row.tableData.level).map((col, col_index) => (
            row.tableData.group[row.tableData.level + col_index].show
              &&
            <AtnBodyGroupRow
              tableRef={tableRef}
              key={"tr-group-" + row_index + "-" + col_index}
              totalColumnsWidth={totalColumnsWidth}
              columns={groupColumns}
              column={col}
              columnIndex={row.tableData.level + col_index}
              row={row}
              rowIndex={row_index}
              renderDataGroupCell={renders.renderDataGroupCell}
            />
          ))
        }
        {row.tableData.show &&
          <AtnBodyRow
            key={"tr-data-" + row_index}
            columns={columns}
            row={row}
            rowIndex={row_index}
            renderDataCell={renders.renderDataCell}
          />
        }
      </React.Fragment>
    ))
  }

  return (
    <div className="atn-table">
      <div className="atn-thead">
        <AtnHeadRow
          tableRef={tableRef}
          columns={columns}
          renderHeaderCell={renders.renderHeaderCell}
        />
      </div>

      <div className="atn-tbody">
        {isPlainData && renderPlainData( data.slice(p1, p2) )}
        {isGroupData && renderGroupData( data.filter(row => row.tableData.gid >= p1 && row.tableData.gid < p2) )}
      </div>
      {
        Object.keys(totals).length !== 0
         &&
        <div className="atn-tfoot">
          <AtnTotalsRow 
            columns={columns}
            totals={totals}
            renderTotalsCell={renders.renderTotalsCell}
          />
        </div>
      }
    </div>
  )
}