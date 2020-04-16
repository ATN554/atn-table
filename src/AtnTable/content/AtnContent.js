import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
import AtnBodyTreeRow from "./AtnBodyTreeRow.js";
import AtnBodyGroupRow from "./AtnBodyGroupRow.js";
import AtnBodyRow from "./AtnBodyRow.js";
import AtnTotalsRow from './AtnTotalsRow.js';

export default function AtnContent(props) {
  const { tableRef, columns, treeColumns, groupColumns, totalColumnsWidth, data, currentPage, pageSize, totals, renders } = props;

  var p1 = pageSize === 0 ? 0 : currentPage * pageSize;
  var p2 = pageSize === 0 ? data.length : p1 + pageSize;

  var isTreeData = treeColumns.length > 0;
  var hasGroups = groupColumns.length > 0;
  var isGroupData = !isTreeData && hasGroups;
  var isPlainData = !isTreeData && !isGroupData;

  const renderPlainRow = (_row, _row_index) => {
    return (
      <AtnBodyRow
        key={"tr-data-" + _row_index}
        columns={columns}
        row={_row}
        rowIndex={_row_index}
        renderDataCell={renders.renderDataCell}
      />
    );
  }

  const renderGroupRow = (_row, _row_index) => {
    return (
      <React.Fragment key={"tr-data-g-" + _row_index}>
        {
          _row.tableData.new 
            &&
          groupColumns.slice(_row.tableData.level).map((col, col_index) => (
            _row.tableData.group[_row.tableData.level + col_index].show
              &&
            <AtnBodyGroupRow
              tableRef={tableRef}
              key={"tr-group-" + _row_index + "-" + col_index}
              totalColumnsWidth={totalColumnsWidth}
              columns={groupColumns}
              column={col}
              columnIndex={_row.tableData.level + col_index}
              row={_row}
              rowIndex={_row_index}
              renderDataGroupCell={renders.renderDataGroupCell}
            />
          ))
        }
        {
          _row.tableData.show && renderPlainRow(_row, _row_index)
        }
      </React.Fragment>
    );
  }

  const renderTreeRow = (_row, _row_index) => {
    return (
      _row.tableData.show && 
      <AtnBodyTreeRow
        tableRef={tableRef}
        key={"tr-data-" + _row_index}
        columns={columns}
        row={_row}
        rowIndex={_row_index}
        renderDataCell={renders.renderDataCell}
      />
    );
  }

  const renderPlainData = (_data) => {
    return _data.map(renderPlainRow);
  }

  const renderGroupData = (_data) => {
    return _data.map(renderGroupRow);
  }

  const renderTreeData = (_data) => {
    return _data.map(renderTreeRow);
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
        {isTreeData && renderTreeData( data.filter(row => row.tableData.tid >= p1 && row.tableData.tid < p2) )}
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