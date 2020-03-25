import React from "react";
import getUID from "../UID/uid.js";

export default class AtnMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuId: getUID(),
      show: false,
      mainClass: props.mainClass,
      contentClass: props.contentClass,
      buttonClass: props.buttonClass
    };

    this.close = this.close.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setShow = this.setShow.bind(this);

    this.onMouseUp = this.onMouseUp.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mouseup", this.onMouseUp);
    document.addEventListener("touchend", this.onTouchEnd);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("touchend", this.onTouchEnd);
  }

  onMouseUp(event) {
    event.preventDefault();
    let el = document.getElementById(this.state.menuId);
    if (el && event.target && !el.contains(event.target)) {
      this.close();
    }
  }

  onTouchEnd(event) {
    event.preventDefault();
    if (event.changedTouches.length > 0) {
      let touch = event.changedTouches[0];
      let el = document.getElementById(this.state.menuId);
      if (el && touch.target && !el.contains(touch.target)) {
        this.close();
      }
    }
  }

  close() {
    this.setShow(false);
  }

  toggle() {
    this.setShow(!this.state.show);
  }

  setShow(show) {
    if (show) {
      document.querySelector("." + this.state.mainClass).classList.add('active');
      document.querySelector("." + this.state.contentClass).classList.add('active');
    } else {
      document.querySelector("." + this.state.mainClass).classList.remove('active');
      document.querySelector("." + this.state.contentClass).classList.remove('active');
    }
    this.setState({show: show});
  }

  render() {
    return (
      <div
        id={this.state.menuId}
        className={this.state.mainClass}
      >
        <div className={this.state.contentClass}>
          {this.props.children}
        </div>
        <input
          type="button"
          value=""
          onClick={this.toggle}
          className={this.state.buttonClass}
        />
      </div>
    );
  }
}