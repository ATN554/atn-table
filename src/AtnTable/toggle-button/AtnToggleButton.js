import React from "react";
import { ReactComponent as Icon } from "./button.svg";
import "./toggle-button.css";

export default function AtnToggleButton(props) {
  const {
    disabled,
    checked,
    onChange
  } = props;

  const getClassName = () => {
    if (disabled) {
      if (checked) {
        return "atn-toggle-button disabled checked";
      } else {
        return "atn-toggle-button disabled";
      }
    } else {
      if (checked) {
        return "atn-toggle-button active checked";
      } else {
        return "atn-toggle-button active";
      }
    }
  }

  const getProps = () => {
    return disabled ? 
      {
        className: getClassName()
      } : 
      {
        className: getClassName(),
        onClick: onChange,
        onTouchEnd: onChange
      };
  }

  return (
    React.createElement(
      Icon,
      {
        ...getProps()
      }
    )
  );
}