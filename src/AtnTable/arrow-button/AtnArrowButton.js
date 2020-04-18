import React from "react";
import { ReactComponent as Icon } from "./button.svg";
import "./arrow-button.css";

export default function AtnArrowButton(props) {
  const {
    arrow,
    disabled,
    onClick
  } = props;

  const getClassName = () => {
    if (disabled) {
      return "atn-arrow-button " + arrow + " disabled";
    } else {
      return "atn-arrow-button " + arrow;
    }
  }

  const getProps = () => {
    return disabled ?
      {
        className: getClassName()
      } :
      {
        className: getClassName(),
        onClick: onClick,
        onTouchEnd: onClick
      };
  }

  return (
    React.createElement(
      React.Fragment,
      null,
      React.createElement(
        Icon,
        {
          ...getProps()
        }
      )
    )
  );
}