import React from "react";
import getUID from "../../UID/uid.js";

export default class AtnMenu extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      menuId: getUID(),
      contentId: getUID(),
      buttonId: getUID(),
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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.show !== nextState.show ||
           this.props.children !== nextProps.children;
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
      document.getElementById(this.state.menuId).classList.add('active');
      document.getElementById(this.state.contentId).classList.add('active');
      document.getElementById(this.state.buttonId).classList.add('active');
    } else {
      document.getElementById(this.state.menuId).classList.remove('active');
      document.getElementById(this.state.contentId).classList.remove('active');
      document.getElementById(this.state.buttonId).classList.remove('active');
    }
    this.setState({show: show});
  }

  render() {
    return (
      <div
        id={this.state.menuId}
        className={this.state.mainClass}
      >
        <div
          id={this.state.contentId}
          className={this.state.contentClass}
        >
          {this.props.children}
        </div>
        <input
          id={this.state.buttonId}
          type="button"
          value=""
          onClick={this.toggle}
          onTouchEnd={this.toggle}
          className={this.state.buttonClass}
        />
      </div>
    );
  }
}