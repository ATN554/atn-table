import React from "react";
import "./content.css";
import AtnHeadRow from "./AtnHeadRow.js";
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
        <AtnTotalsRow 
          columns={props.columns}
          totals={props.totals}
          renderTotalsCell={props.renders.renderTotalsCell}
        />
      </div>
    </div>
  )
}