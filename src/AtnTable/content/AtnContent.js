import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
import AtnBodyTreeRow from "./AtnBodyTreeRow.js";
import AtnBodyGroupRow from "./AtnBodyGroupRow.js";
import AtnBodyRow from "./AtnBodyRow.js";
import AtnTotalsRow from './AtnTotalsRow.js';

export default function AtnContent(props) {
  const {
    dataInfo,
    data,
    currentPage,
    pageSize,
    totals,
    renders,
    updateColumns,
    updateData,
    setSelectedRow
  } = props;

  const {
    headColumns,
    groupColumns,
    totalColumnsWidth,
    isGroupData,
    isTreeData
  } = dataInfo;

  const p1 = pageSize === 0 ? 0 : currentPage * pageSize;
  const p2 = pageSize === 0 ? data.length : p1 + pageSize;

  const renderPlainRow = (_row, _row_index) => {
    return (
      <AtnBodyRow
        key={"tr-data-" + _row_index}
        columns={headColumns}
        row={_row}
        rowIndex={_row_index}
        renderDataCell={renders.renderDataCell}
        renderDetailsPanel={renders.renderDetailsPanel}
        setSelectedRow={setSelectedRow}
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
              key={"tr-group-" + _row_index + "-" + col_index}
              column={col}
              columnIndex={_row.tableData.level + col_index}
              row={_row}
              rowIndex={_row_index}
              renderDataGroupCell={renders.renderDataGroupCell}
              updateData={updateData}
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
        key={"tr-data-" + _row_index}
        columns={headColumns}
        row={_row}
        rowIndex={_row_index}
        renderDataCell={renders.renderDataCell}
        renderDetailsPanel={renders.renderDetailsPanel}
        updateData={updateData}
        setSelectedRow={setSelectedRow}
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

  const renderData = isTreeData ? 
                     data.filter(row => row.tableData.tid >= p1 && row.tableData.tid < p2) :
                     isGroupData ?
                     data.filter(row => row.tableData.gid >= p1 && row.tableData.gid < p2) :
                     data.slice(p1, p2);
  const renderFunction = isTreeData ?
                         renderTreeData :
                         isGroupData ?
                         renderGroupData :
                         renderPlainData;

  return (
    <div className="atn-table">
      <div
        className="atn-thead"
        style={{ width: (totalColumnsWidth + 1) + "px" }}
      >
        <AtnHeadRow
          columns={headColumns}
          renderHeaderCell={renders.renderHeaderCell}
          updateColumns={updateColumns}
        />
      </div>

      <div 
        className="atn-tbody"
        style={{ width: (totalColumnsWidth + 1) + "px" }}
      >
        {renderFunction(renderData)}
      </div>
      {
        Object.keys(totals).length !== 0
         &&
        <div
          className="atn-tfoot"
          style={{ width: (totalColumnsWidth + 1) + "px" }}
        >
          <AtnTotalsRow 
            columns={headColumns}
            totals={totals}
            renderTotalsCell={renders.renderTotalsCell}
          />
        </div>
      }
    </div>
  )
}