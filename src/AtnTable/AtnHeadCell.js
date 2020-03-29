import React from "react";
import getUID from "../UID/uid.js";
import Draggable from "../DND/Draggable.js";
import Droppable from "../DND/Droppable.js";

export default class AtnHeadCell extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      memProps: props,
      droppableId: props.column.tableData.droppableId,
      draggableId: props.column.tableData.draggableId,
      resizerId: getUID(),
      column: props.column,
      pageX: undefined,
      curCol: undefined,
      curColWidth: undefined,
      curColMinWidth: props.column.minWidth ? props.column.minWidth : 0,
      curColMaxWidth: props.column.maxWidth ? props.column.maxWidth : 500,
      resizerWidth: 0,

      updateColumn: false
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

  static getDerivedStateFromProps = (nextProps, prevState) => {
    let changed = { update: false };
    if (prevState.memProps.updateColumn !== nextProps.updateColumn) {
      changed.columns = nextProps.columns;
      changed.updateColumn = nextProps.updateColumn;
      changed.update = true;
    }
    if (changed.update) {
      return { ...prevState, ...changed, memProps: nextProps }
    } else {
      return null;
    }
  }

  render() {
    let column = this.state.column;
    
    if (column.draggable) {
      return (
        <Droppable
          id={this.state.droppableId}
          type="div"
          className="atn-thead-td atn-thead-td-droppable"
        >
          <Draggable
            id={this.state.draggableId}
            type="div"
            droppable={"atn-thead-td-droppable"}
            className="atn-thead-td-container atn-cursor-move"
            style={{ width: (column.width - this.state.resizerWidth) + "px" }}
            axis="horizontal"
            onDragEnd={(idFrom, idTo, x, y) => this.props.onDragEnd(idFrom, idTo)}
          >
            {column.title} {column.tableData.id} {column.tableData.sort.id || 0} {column.tableData.group.id || 0}
          </Draggable>

          <Draggable
            id={this.state.resizerId}
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
    return (
      <div
        type="div"
        className="atn-thead-td"
      >
        <div
          id={this.state.draggableId}
          className="atn-thead-td-container"
          style={{ width: (column.width - this.state.resizerWidth) + "px" }}
        >
          {column.title}
        </div>

        <Draggable
          id={this.state.resizerId}
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
      </div>
    );
  }
}