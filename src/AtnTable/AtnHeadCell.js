import React from "react";
import getUID from "../UID/uid.js";
import Draggable from "../DND/Draggable.js";
import Droppable from "../DND/Droppable.js";

export default class AtnTheadTr extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      droppableId: props.column.tableData.droppableId,
      draggableId: props.column.tableData.draggableId,
      resizerId: getUID(),
      column: props.column,
      pageX: undefined,
      curCol: undefined,
      curColWidth: undefined,
      curColMinWidth: props.column.minWidth ? props.column.minWidth : 0,
      curColMaxWidth: props.column.maxWidth ? props.column.maxWidth : 500,
      resizerWidth: 0
    }

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.allowMove = this.allowMove.bind(this);
  }

  onDragStart(idFrom, x, y) {
    let curCol = document.getElementById(this.state.draggableId);
    let cs = getComputedStyle(curCol);
    let width =
      curCol.offsetWidth -
      parseFloat(cs.paddingLeft) -
      parseFloat(cs.paddingRight) -
      parseFloat(cs.borderLeftWidth) -
      parseFloat(cs.borderRightWidth) +
      this.state.resizerWidth;
    this.setState({
      curCol: curCol,
      pageX: x,
      curColWidth: width
    });
  }

  onDragMove(idFrom, x, y) {
    let curCol = this.state.curCol;
    if (curCol) {
      let diffX = x - this.state.pageX;
      let newWidth = this.state.curColWidth + diffX;
      this.props.onChangeWidth(this.state.column, newWidth);
    }
  }

  onDragStop(idFrom, x, y) {
    this.setState({
      curCol: undefined,
      pageX: undefined,
      curColWidth: undefined
    });
  }

  allowMove(idFrom, xs, ys, xe, ye) {
    let curCol = this.state.curCol;
    if (curCol) {
      let deltaX = xe - xs;
      let diffX = xe - this.state.pageX;
      let newWidth = this.state.curColWidth + diffX;
      let minWidth = this.state.curColMinWidth + this.state.resizerWidth;
      let maxWidth = this.state.curColMaxWidth;
      return ((deltaX < 0 && newWidth > minWidth) || (deltaX > 0 && newWidth < maxWidth));
    }
    return false;
  }

  componentDidMount() {
    let resizer = document.getElementById(this.state.resizerId);
    let resizerWidth = resizer.offsetWidth;
    this.setState({ resizerWidth: resizerWidth});
  }

  render() {
    return(
      <Droppable
        id={this.state.droppableId}
        type="div"
        className="atn-thead-td"
      >
        <Draggable
          id={this.state.draggableId}
          type="div"
          droppable={"atn-thead-td"}
          className="atn-thead-td-container"
          style={{ width: (this.state.column.width - this.state.resizerWidth) + "px" }}
          axis="horizontal"
          onDragEnd={(idFrom, idTo, x, y) => this.props.onDragEnd(idFrom, idTo)}
        >
          {this.state.column.title}
        </Draggable>

        <Draggable
          id={this.state.resizerId}
          type="div"
          showClone={false}
          className="atn-thead-td-resizer"
          axis="horizontal"
          onDragStart={(idFrom, x, y) => { this.onDragStart(idFrom, x, y); }}
          onDragMove={(idFrom, x, y) => { this.onDragMove(idFrom, x, y); }}
          onDragEnd={(idFrom, idTo, x, y) => { this.onDragStop(idFrom, x, y); }}
          onDragCancel={(idFrom, x, y) => { this.onDragStop(idFrom, x, y); }}
          allowMove={(idFrom, xs, ys, xe, ye) => { return this.allowMove(idFrom, xs, ys, xe, ye); }}
        />
      </Droppable>
    );
  }
}