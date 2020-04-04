import React from "react";
import getUID from "../../UID/uid.js";

export default class AtnSortPanel extends React.Component {
  /*constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <div>
        {this.props.columns.map((column, column_index) => (
          <div>
            {column.title}
          </div>
        ))}
      </div>
    );
  }
}