import React from "react";
import "./styles.css";
import AtnTable from "./AtnTable/AtnTable.js";
import {
  groupColumns,
  treeColumnsStatic,
  treeColumnsLoad,
  data,
  totals
} from "./data.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.tableRef = null;
  }

  componentDidMount() {
    this.tableRef.setData(data.slice(0));
    this.tableRef.setTotals(totals);
  }

  render() {
    return (
      <div className="content">
        <AtnTable
          ref={el =>  this.tableRef = el}
          title="Заголовок таблицы"
          columns={groupColumns}
          pageSize={20}
          pageSizeOptions={[10, 20, 50, 0]}
          toolbarElements={[
            <input
              className="toolbar-button"
              type="button"
              value="Режим группировки"
              onClick={() => {
                data.forEach((el) => el.tableData = undefined);
                this.tableRef.setColumnsAndData(groupColumns, true, true, data.slice(0), true);
              }}
            />,
            <input
              className="toolbar-button"
              type="button"
              value="Режим постоянного дерева"
              onClick={() => {
                data.forEach((el) => el.tableData = undefined);
                this.tableRef.setColumnsAndData(treeColumnsStatic, true, true, data.slice(0), true);
              }}
            />,
            <input
              className="toolbar-button"
              type="button"
              value="Режим динамического дерева"
              onClick={() => {
                data.forEach((el) => el.tableData = undefined);
                this.tableRef.setColumnsAndData(treeColumnsLoad, true, true, data.slice(0), true);
              }}
            />
          ]}
          _renderDetailsPanel={(row, rowIndex) => {
            return <div style={{margin: "3px", padding: "3px", border: "1px solid black", borderRadius: "5px"}}>NPP: {row["#NPP"]}</div>
          }}
        />
      </div>
    );
  }
}

