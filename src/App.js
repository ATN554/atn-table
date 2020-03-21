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
          columns={this.state.columns}
          data={this.state.data}
          totals={this.state.totals}
        />
      </div>
    );
  }
}

