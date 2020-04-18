import React from "react";
import "./styles.css";
import AtnTable from "./AtnTable/AtnTable.js";
import { columns, data, totals } from "./data.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.tableRef = null;

    this.state = {
      columns: columns,
      data: data,
      totals: totals
    };
  }

  componentDidMount() {
    this.tableRef.setData(this.state.data);
    this.tableRef.setTotals(this.state.totals);
  }

  render() {
    return (
      <div className="content">
        <AtnTable
          ref={el =>  this.tableRef = el}
          title="Заголовок таблицы"
          columns={this.state.columns}
          pageSize={20}
          pageSizeOptions={[10, 20, 50, 0]}
        />
      </div>
    );
  }
}

