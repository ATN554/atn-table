import React from "react";
import Draggable from "../DND/Draggable.js";

export default class AtnTheadTr extends React.Component {
  constructor(props) {
    super(props);

    this.ref = null;

    let enabled = this.props.enabled === undefined ? true : this.props.enabled;

    let innerThStyle = {
      overflow: "hidden",
      display: "inline-block",
      verticalAlign: "middle"
    };
    if (this.props.minWidth) innerThStyle.minWidth = this.props.minWidth + "px";
    if (this.props.maxWidth) innerThStyle.maxWidth = this.props.maxWidth + "px";

    let elements = this.props.children;
    let modElements = React.Children.map(elements, (childTh, idx) => {
      return React.cloneElement(
        childTh,
        {
          ...childTh.props,
          style: { overflow: "hidden", whiteSpace: "nowrap" }
        },
        [
          React.Children.map(childTh.props.children, innerTh => {
            return React.cloneElement(
              innerTh,
              { ...innerTh.props, style: innerThStyle },
              innerTh.props.children
            );
          }),
          enabled && (
            <Draggable
              id={"resizable-th-" + idx}
              key={"resizable-th-" + idx}
              type="div"
              showClone={false}
              className="atn-thead-td-resizer"
              style={{
                cursor: "col-resize",
                userSelect: "none",
                display: "inline-block",
                verticalAlign: "middle"
              }}
              axis="horizontal"
              onDragStart={(idFrom, x, y) => {
                this.onDragStart(idFrom, x, y);
              }}
              onDragMove={(idFrom, x, y) => {
                this.onDragMove(idFrom, x, y);
              }}
              onDragEnd={(idFrom, idTo, x, y) => {
                this.onDragStop(idFrom, x, y);
              }}
              onDragCancel={(idFrom, x, y) => {
                this.onDragStop(idFrom, x, y);
              }}
              allowMove={(idFrom, xs, ys, xe, ye) => {
                return this.allowMove(idFrom, xs, ys, xe, ye);
              }}
            >
              {this.props.resizer}
            </Draggable>
          )
        ]
      );
    });

    this.state = {
      elements: modElements,
      pageX: undefined,
      curCol: undefined,
      curColWidth: undefined,
      curColMinWidth: undefined,
      curColMaxWidth: this.props.maxWidth
    };

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragMove = this.onDragMove.bind(this);
    this.onDragStop = this.onDragStop.bind(this);
    this.allowMove = this.allowMove.bind(this);
  }

  onDragStart(idFrom, x, y) {
    let elem = document.getElementById(idFrom);
    let curCol = elem.previousElementSibling;
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
      if (this.props.onChangeWidth) {
        this.props.onChangeWidth(idFrom, curCol.parentElement.offsetWidth);
      }
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
    return React.createElement(
      "div",
      {
        ref: "reftrresizer",
        id: this.props.id,
        className: this.props.className,
        style: this.props.style
      },
      this.state.elements
    );
  }
}
