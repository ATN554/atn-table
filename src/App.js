import React from "react";
import "./styles.css";
import AtnTable from "./AtnTable/AtnTable.js";
import { columns, data } from "./data.js";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: columns,
      data: data,
      widths: [100, 200, 50, 90],
      resizer: (
        <div></div>
      )
    };

    this.handleHeaderResize = this.handleHeaderResize.bind(this);
  }

  handleHeaderResize(idx, width) {
    let widths = this.state.widths;
    widths[idx] = width;
    this.setState({ widths: widths });
  }

  render() {
    return (
      <div className="content">
        <AtnTable
          columns={this.state.columns}
          data={this.state.data}
          resizer={this.state.resizer}
        />
      </div>
    );
  }
}

