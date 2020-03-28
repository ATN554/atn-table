import React from "react";

export default class AtnBodyRow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      memProps: props,
      column: props.column,
      value: props.value,

      updateColumn: false,
      updateValue: false
    };
  }

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let changed = { repaint: false };
    if (prevState.memProps.updateColumn !== nextProps.updateColumn) {
      changed.column = nextProps.column;
      changed.updateColumn = nextProps.updateColumn;
      changed.repaint = true;
    }
    if (prevState.memProps.updateValue !== nextProps.updateValue) {
      changed.value = nextProps.value;
      changed.updateValue = nextProps.updateValue;
      changed.repaint = true;
    }
    if (changed.repaint) {
      return { ...prevState, ...changed, memProps: nextProps }
    } else {
      return null;
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.updateColumn !== nextState.updateColumn ||
      this.state.updateValue !== nextState.updateValue;
  }

  render() {
    let column = this.state.column;
    return (
      <div className="atn-tbody-td">
        <div
          className={"atn-tbody-td-container atn-" + column.align + "-align"}
          style={{ width: column.width + "px" }}
        >
          {this.state.value}
        </div>
      </div>
    );
  }
}