import React from "react";
import Draggable from "../DND/Draggable.js";
import Droppable from "../DND/Droppable.js";

export default class AtnTheadTr extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    this.state = {
      selfId: "Droppable" + props.column.tableData.id,
      column: props.column,
      pageX: undefined,
      curCol: undefined,
      curColWidth: undefined,
      curColMinWidth: undefined,
      curColMaxWidth: this.props.maxWidth
    }

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.allowMove = this.allowMove.bind(this);
  }

  onDragStart(idFrom, x, y) {
    let curCol = document.getElementById(this.state.selfId);
    let cs = getComputedStyle(curCol);
    let width =
      curCol.offsetWidth -
      parseFloat(cs.paddingLeft) -
      parseFloat(cs.paddingRight) -
      parseFloat(cs.borderLeftWidth) -
      parseFloat(cs.borderRightWidth);
    if (!curCol.style.minWidth) {
      curCol.style.minWidth =
        (this.props.minWidth ? this.props.minWidth : width) + "px";
    }
    this.setState({
      curCol: curCol,
      pageX: x,
      curColWidth: width,
      curColMinWidth: parseFloat(curCol.style.minWidth)
    });
  }

  onDragMove(idFrom, x, y) {
    let curCol = this.state.curCol;
    if (curCol) {
      let diffX = x - this.state.pageX;
      let newWidth = this.state.curColWidth + diffX;
      curCol.style.width = newWidth + "px";
      //this.props.onChangeWidth(this.state.column, curCol.offsetWidth);
      this.props.onChangeWidth(this.state.column, newWidth);
    }
  }

  onDragStop(idFrom, x, y) {
    this.setState({
      curCol: undefined,
      pageX: undefined,
      curColWidth: undefined,
      curColMinWidth: undefined
    });
  }

  allowMove(idFrom, xs, ys, xe, ye) {
    let curCol = this.state.curCol;
    if (curCol) {
      let diffX = xe - this.state.pageX;
      let newWidth = this.state.curColWidth + diffX;
      let minWidth = this.state.curColMinWidth;
      let maxWidth = this.state.curColMaxWidth;
      return newWidth > minWidth && (maxWidth ? newWidth < maxWidth : true);
    }
    return false;
  }

  render() {
    let column = this.state.column;
    let id = column.tableData.id;
    let width = column.tableData.width;
    return(
      <Droppable
        id={this.state.selfId}
        key={"th" + id}
        type="div"
        className="atn-thead-td"
        style={{ width: (width+7) + "px" }}
      >
        <Draggable
          id={"Draggable" + id}
          droppable={"atn-thead-td"}
          type="div"
          axis="horizontal"
          className="atn-thead-td-container"
          onDragEnd={(idFrom, idTo, x, y) => this.props.onDragEnd(idFrom, idTo)}
        >
          {column.title}
        </Draggable>

        <Draggable
          id={"resizable-th-" + id}
          key={"resizable-th-" + id}
          type="div"
          showClone={false}
          className="atn-thead-td-resizer"
          axis="horizontal"
          onDragStart={(idFrom, x, y) => { this.onDragStart(idFrom, x, y); }}
          onDragMove={(idFrom, x, y) => { this.onDragMove(idFrom, x, y); }}
          onDragEnd={(idFrom, idTo, x, y) => { this.onDragStop(idFrom, x, y); }}
          onDragCancel={(idFrom, x, y) => { this.onDragStop(idFrom, x, y); }}
          allowMove={(idFrom, xs, ys, xe, ye) => { return this.allowMove(idFrom, xs, ys, xe, ye); }}
        >
          {this.props.resizer}
        </Draggable>
      </Droppable>
    );
  }
}