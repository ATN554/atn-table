import React from "react";
import Draggable from "../../DND/Draggable.js";
import Droppable from "../../DND/Droppable.js";

export default class AtnHeadCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageX: undefined,
      curCol: undefined,
      curColWidth: undefined,
    }

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.allowMove = this.allowMove.bind(this);
  }

  onDragStart(idFrom, x, y) {
    let curCol = document.getElementById(this.props.column.dnd.headDraggableId);
    let cs = getComputedStyle(curCol);
    let width =
      curCol.offsetWidth -
      parseFloat(cs.paddingLeft) -
      parseFloat(cs.paddingRight) -
      parseFloat(cs.borderLeftWidth) -
      parseFloat(cs.borderRightWidth);
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
      this.props.onChangeWidth(this.props.column, newWidth);
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
      let column = this.props.column;
      let deltaX = xe - xs;
      let diffX = xe - this.state.pageX;
      let newWidth = this.state.curColWidth + diffX;
      let minWidth = (column.minWidth !== undefined ? column.minWidth : 0);
      let maxWidth = (column.maxWidth !== undefined ? column.maxWidth : 500);
      return ((deltaX < 0 && newWidth > minWidth) || (deltaX > 0 && newWidth < maxWidth));
    }
    return false;
  }

  render() {
    let column = this.props.column;
    let droppableClassName = column.dnd.droppable ? "atn-thead-td atn-thead-td-droppable" : "atn-thead-td";
    let draggableClassName = column.dnd.draggable ? "atn-thead-td-container atn-cursor-move" : "atn-thead-td-container";
    return (
      <Droppable
        id={column.dnd.headDroppableId}
        type="div"
        className={droppableClassName}
      >
        <Draggable
          id={column.dnd.headDraggableId}
          type="div"
          droppable={"atn-thead-td-droppable"}
          className={draggableClassName}
          style={{ width: column.width + "px" }}
          axis="horizontal"
          onDragEnd={(idFrom, idTo, x, y) => this.props.onDragEnd(idFrom, idTo)}
          enabled={column.dnd.draggable}
        >
          {this.props.renderHeaderCell(column, this.props.columnIndex)}
        </Draggable>

        <Draggable
          type="div"
          showClone={false}
          className="atn-thead-td-resizer atn-cursor-resize-horizontal"
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