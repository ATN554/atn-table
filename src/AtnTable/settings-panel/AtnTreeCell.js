import React from "react";
import AtnSortButton from "../sort-button/AtnSortButton.js";

const renderSort = (column, fnc) => {
  return (
    <div className="atn-settings-sort">
      <AtnSortButton
        order={column.sort.order}
        disabled={false}
        onChange={(order) => { fnc(column, order) }}
        radio={true}
      />
    </div>
  );
}

export default function AtnTreeCell(props) {
  return (
    <div
      className="atn-settings-tr"
    >
      <div
        className="atn-settings-td"
      >
        <div className="atn-settings-td-text tree">
          {props.renderHeaderCell(props.column, props.columnIndex)}
        </div>
       
        {props.column.tree === 2 && renderSort(props.column, props.onChangeTreeOrder)}
      </div>

      <div>
      </div>
    </div>
  );
}