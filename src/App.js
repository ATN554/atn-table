import React from "react";
import "./styles.css";
import AtnTable from "./AtnTable/AtnTable.js";
import { columns, data, totals } from "./data.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: columns,
      data: data,
      totals: totals
    };
  }

  render() {
    return (
      <div className="content">
        <AtnTable
          title="Заголовок таблицы"
          columns={this.state.columns}
          data={this.state.data}
          totals={this.state.totals}
          pageSize={20}
          pageSizeOptions={[10, 20, 50, 0]}
        />
      </div>
    );
  }
}

