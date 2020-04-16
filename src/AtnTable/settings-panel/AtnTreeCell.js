import React from "react";
import AtnSortButton from "../sort-button/AtnSortButton.js";



export default function AtnTreeCell(props) {
  const {
    column,
    columnIndex,
    renderHeaderCell,
    onChangeTreeOrder
  } = props;

  const renderSort = () => {
    return (
      <div className="atn-settings-sort">
        <AtnSortButton
          order={column.sort.order}
          disabled={false}
          onChange={(order) => { onChangeTreeOrder(column, order) }}
          radio={true}
        />
      </div>
    );
  }

  return (
    <div
      className="atn-settings-tr"
    >
      <div
        className="atn-settings-td"
      >
        <div className="atn-settings-td-text tree">
          {renderHeaderCell(column, columnIndex)}
        </div>
       
        {column.tree === 2 && renderSort()}
      </div>

      <div>
      </div>
    </div>
  );
}